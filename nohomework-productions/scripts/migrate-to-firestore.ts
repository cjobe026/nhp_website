import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { newsArticles } from '../lib/newsData';
import { films } from '../app/constants';
import { events } from '../app/events/events-data';

const serviceAccount = require('./serviceAccountKey-dev.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function migrateArticles() {
  console.log('Migrating articles...');
  const batch = db.batch();
  
  newsArticles.forEach((article, index) => {
    const docRef = db.collection('articles').doc(article.id);
    const { relatedLinks, ...articleData } = article;
    batch.set(docRef, {
      ...articleData,
      slug: article.id,
      relatedLinks: relatedLinks || [],
      showInCarousel: index < 3,
      carouselOrder: index,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });
  
  await batch.commit();
  console.log(`✓ Migrated ${newsArticles.length} articles`);
}

async function migrateFilms() {
  console.log('Migrating films...');
  const batch = db.batch();
  
  films.forEach((film) => {
    const docRef = db.collection('films').doc(film.name.toLowerCase().replace(/\s+/g, '-'));
    batch.set(docRef, {
      ...film,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });
  
  await batch.commit();
  console.log(`✓ Migrated ${films.length} films`);
}

async function migrateEvents() {
  console.log('Migrating events...');
  const batch = db.batch();
  
  events.forEach((event, index) => {
    const docRef = db.collection('events').doc(event.id.toString());
    batch.set(docRef, {
      ...event,
      showOnMainPage: event.status === 'upcoming',
      mainPageOrder: index,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });
  
  await batch.commit();
  console.log(`✓ Migrated ${events.length} events`);
}

async function migrate() {
  try {
    await migrateArticles();
    await migrateFilms();
    await migrateEvents();
    console.log('\n✓ Migration complete!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
