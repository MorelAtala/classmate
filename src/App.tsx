import { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import FilesChooser from "./pages/FilesChooser";
import QrCodeScanner from "./pages/QrCodeScanner";
import QrCodeShower from "./pages/QrCodeShower";
import { AppStateContext } from "./store";
import Inbox from "./pages/Inbox";
import { Database } from "./config/Firebase";
import Bucket from "./types/Bucket";
import { useAuth } from "./utils/Firebase";
import PrintMyCode from "./pages/PrintMyCode";
import Homepage from "./pages/Homepage";
import Layout from "./components/Layout";
import Share from "./pages/Share";


function App() {
    const [receiverId, setReceiverId] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);
    const [buckets, setBuckets] = useState<Bucket[]>([]);
    const auth = useAuth();

    useEffect(() => {
        const ref = Database.ref("content").child(auth?.uid!);

        ref.on("child_added", (snapshot) => {
            setBuckets((buckets) => [
                ...buckets,
                { id: snapshot.key, ...snapshot.val() },
            ]);
        });

        ref.on("child_changed", (snapshot) => {
            setBuckets((buckets) =>
                buckets.map((bucket) =>
                    bucket.id === snapshot.key
                        ? { id: snapshot.key, ...snapshot.val() }
                        : bucket
                )
            );
        });

        return () => {
            setBuckets([]);
            ref.off();
        };
    }, [auth]);

    return (
        <BrowserRouter>
            <AppStateContext.Provider
                value={{
                    files,
                    setFiles: (files) => setFiles(files),
                    receiverId,
                    setReceiverId: (id) => setReceiverId(id),
                    buckets,
                    setBuckets: (buckets) => setBuckets(buckets),
                }}
            >
                <Routes>
                    <Route element={<Layout><Share /></Layout>} path="/sharing" />
                    <Route element={<Layout><Inbox /></Layout>} path="/inbox" />
                    <Route element={<Layout><QrCodeScanner /></Layout>} path="/share" />
                    <Route element={<Layout><QrCodeShower /></Layout>} path="/receive" />
                    <Route element={<Layout><PrintMyCode /></Layout>} path="/print-code" />
                    <Route element={<Layout><FilesChooser /></Layout>} path="/fileschooser" />
                    <Route element={<Homepage />} path="/" />
                </Routes>

            </AppStateContext.Provider>
        </BrowserRouter>
    );
}

export default App;
