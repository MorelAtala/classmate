import firebase from 'firebase/compat/app';
import { Auth, FirebaseStorage } from "../config/Firebase";
import { useEffect, useState } from "react";

export function uploadFile({
  path,
  file,
  onProgressChange,
}: {
  path: string;
  file: File;
  onProgressChange: (percent: number) => void;
}): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const uploadTask = FirebaseStorage.ref(path).put(file, {
      contentDisposition: `attachment; filename="${file.name}"`,
    });

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot:any) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgressChange(progress);
      },
      (error:any) => reject(error),
      async () => {
        const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
        return resolve(downloadUrl);
      }
    );
  });
}




export function useAuth() {
  const [user, setUser] = useState<firebase.User>(Auth.currentUser!);

  useEffect(() => {
    const unsub = Auth.onAuthStateChanged((auth) => {
      setUser(auth!);
    });

    return () => unsub();
  }, []);

  return user;
}
