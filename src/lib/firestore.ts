import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  setDoc,
  Timestamp,
  DocumentData,
} from 'firebase/firestore';
import { getDb } from './firebase';

// ─── Clients ────────────────────────────────────────────────────────────────

export async function getClients() {
  const q = query(collection(getDb(), 'clients'), orderBy('order'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export async function getTestimonials() {
  const q = query(collection(getDb(), 'testimonials'), orderBy('order'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ─── Blog Posts ──────────────────────────────────────────────────────────────

export async function getBlogPosts() {
  const q = query(
    collection(getDb(), 'blog_posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getAllBlogPosts() {
  const q = query(collection(getDb(), 'blog_posts'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getBlogPostBySlug(slug: string) {
  const q = query(collection(getDb(), 'blog_posts'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

// ─── Services ────────────────────────────────────────────────────────────────

export async function getServices() {
  const q = query(collection(getDb(), 'services'), orderBy('order'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getServiceBySlug(slug: string) {
  const q = query(collection(getDb(), 'services'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

// ─── Case Studies ────────────────────────────────────────────────────────────

export async function getCaseStudies() {
  const q = query(collection(getDb(), 'case_studies'), orderBy('order'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export async function getStats() {
  const ref = doc(getDb(), 'stats', 'main');
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  await addDoc(collection(getDb(), 'contact_submissions'), {
    ...data,
    createdAt: Timestamp.now(),
    read: false,
  });
}

export async function getContactSubmissions() {
  const q = query(collection(getDb(), 'contact_submissions'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ─── Admin CRUD ───────────────────────────────────────────────────────────────

export async function createDocument(collectionName: string, data: DocumentData) {
  return addDoc(collection(getDb(), collectionName), {
    ...data,
    createdAt: Timestamp.now(),
  });
}

export async function updateDocument(collectionName: string, id: string, data: DocumentData) {
  const ref = doc(getDb(), collectionName, id);
  return updateDoc(ref, { ...data, updatedAt: Timestamp.now() });
}

export async function deleteDocument(collectionName: string, id: string) {
  const ref = doc(getDb(), collectionName, id);
  return deleteDoc(ref);
}

export async function setDocument(collectionName: string, id: string, data: DocumentData) {
  const ref = doc(getDb(), collectionName, id);
  return setDoc(ref, { ...data, updatedAt: Timestamp.now() }, { merge: true });
}

export async function getCollectionCount(collectionName: string): Promise<number> {
  const snap = await getDocs(collection(getDb(), collectionName));
  return snap.size;
}
