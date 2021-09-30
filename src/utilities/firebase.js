import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCpzNU6UVuN5yfJ3v1u8k0drq-HLywbGTY",
    authDomain: "caedonhsieh-cs497-scheduler.firebaseapp.com",
    databaseURL: "https://caedonhsieh-cs497-scheduler-default-rtdb.firebaseio.com",
    projectId: "caedonhsieh-cs497-scheduler",
    storageBucket: "caedonhsieh-cs497-scheduler.appspot.com",
    messagingSenderId: "948743583505",
    appId: "1:948743583505:web:188aca3a1d643168533eb0",
    measurementId: "G-CT30Q0JJS5"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};

export const setData = (path, value) => (
    set(ref(database, path), value)
  );