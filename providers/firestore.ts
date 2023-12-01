import admin from 'firebase-admin'

let app

if (admin.apps.length === 0) {
   app = admin.initializeApp({
      credential: admin.credential.cert({
         projectId: process.env.FIREBASE_PROJECT_ID,
         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
         privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
   })
}

export const firestore = app?.firestore()

// export const firestore = initFirestore({
//    credential: cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//    }),
// })
// console.log('F', firestore)

export const firebaseAuth = admin.auth(app)
