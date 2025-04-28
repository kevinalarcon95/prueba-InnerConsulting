import { IInscriptionResponse } from '@/types';
import { openDB, DBSchema } from 'idb';

interface InscriptionDB extends DBSchema {
    inscriptions: {
        key: number | string;
        value: IInscriptionResponse
        };
    };

const DB_NAME = 'inscription-db';
const DB_VERSION = 1;

export const initDB = async () => {
    return openDB<InscriptionDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            db.createObjectStore('inscriptions', { keyPath: 'id' });
        },
    });
}

export const addInscription = async (inscription: IInscriptionResponse) => {
    const db = await initDB();
    await db.put('inscriptions', inscription);
}

export const getInscriptions = async () => {
    const db = await initDB();
    return db.getAll('inscriptions');
}

export const clearInscriptions = async () => {
    const db = await initDB();
    const tx = db.transaction('inscriptions', 'readwrite');
    await tx.objectStore('inscriptions').clear();
    await tx.done;
}

export const addInscriptions = async (inscriptions: IInscriptionResponse[]) => {
    const db = await initDB();
    const tx = db.transaction('inscriptions', 'readwrite');
    const store = tx.objectStore('inscriptions');
    
    for (const inscription of inscriptions) {
        await store.put(inscription);
    }
    
    await tx.done;
}

export const deleteInscription = async (id: string | number) => {
    const db = await initDB();
    return db.delete('inscriptions', id);
}