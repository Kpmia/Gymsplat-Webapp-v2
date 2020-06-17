import db from './firebase'


//Current Activity Times for Machines 
export const cardioCount = db.collection('gtuniversity').doc('cardiomachines').collection('peoplecount').orderBy('timestamp', 'desc').limit(1).get()

export const weightCount = db.collection('gtuniversity').doc('weights').collection('peoplecount').orderBy('timestamp', 'desc').limit(1)

export  const rackCount = db.collection('gtuniversity').doc('squatracks').collection('peoplecount').orderBy('timestamp', 'desc').limit(1)

export const benchCount = db.collection('gtuniversity').doc('benchpress').collection('peoplecount').orderBy('timestamp', 'desc').limit(1)



// Maximum Values for different machines

export const weightsMax = db.collection('gtuniversity').doc('weights').collection('peoplecount').orderBy('People', 'desc').limit(1)

export const racksMax = db.collection('gtuniversity').doc('squatracks').collection('peoplecount').orderBy('People', 'desc').limit(1)

export const cardioMax = db.collection('gtuniversity').doc('cardiomachines').collection('peoplecount').orderBy('People', 'desc').limit(1)

export const benchMax = db.collection('gtuniversity').doc('benchpress').collection('peoplecount').orderBy('People', 'desc').limit(1)
