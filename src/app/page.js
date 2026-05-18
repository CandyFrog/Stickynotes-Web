"use client";
import { useState, useEffect } from "react";


export default function Home() {
  // State dengan tambahan 'id' dari logika keduamu
  const [notes, setNotes] = useState([
    {
      id: 1,
      judul: "Belajar Next.js",
      isi: "Belajar Next.js asik sekali",
    },
    {
      id: 2,
      judul: "Always",
      isi: "And I'll be here, 'cause we both know how it goes, I don't want things to change, I pray they stay the same always, And I don't care if you're with somebody else, I'll give you time and space, just know I'm not a phase, I'm always, ways, ways",
    },
  ]);

  // useEffect 1
  useEffect(() => {
    const savedNotes = localStorage.getItem("notesLS");

    if(savedNotes){
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // useEffect 2
  useEffect(()=>{
    localStorage.setItem("notesLS", JSON.stringify(notes));
  }, [notes]);

  const [showModal, setShowModal] = useState(false);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleEdit = (note) => {
    setShowModal(true);
    setIsEdit(true);
    setSelectedId(note.id);

    setJudul(note.judul);
    setIsi(note.isi);
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Apakah yakin akan dihapus?");
    if (confirmDelete) {
      const filteredNotes = notes.filter(
        (note) => note.id !== id
      );
      setNotes(filteredNotes);
    }
  };

  // Logika simpan
  const simpanArrowFunction = (e) => {
    e.preventDefault();

    if (!judul || !isi) {
      alert("Judul dan isi tidak boleh kosong");
      return;
    }

    if (isEdit) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedId ? {
          ...note,
          judul,
          isi
        } : note
      );

      setNotes(updatedNotes);
      resetForm();
      setShowModal(false);

    } else {
      const newNotes = {
        id: Date.now(),
        judul,
        isi,
      };

      setNotes([...notes, newNotes]);

      // Reset input dan tutup modal
      setJudul("");
      setIsi("");
      setShowModal(false);

      console.log(newNotes);
    }

    // const newNotes = {
    //   id: Date.now(),
    //   judul,
    //   isi,
    // };

  };

  const simpanExpressionFunction = function () {

  }

  function simpanDeclarative() {

  }

  const resetForm = () => {
    setJudul("");
    setIsi("");

    setIsEdit(false);
    setSelectedId(null);
  }

  return (
    <main className="p-8 min-h-screen bg-pink-50 relative pb-32">
      {/* Judul */}
      <h1 className="text-center text-4xl text-pink-600 font-extrabold mb-12 mt-4 tracking-tight">
        Sticky Notes
      </h1>

      {/* Note Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {notes.map((note) => (
          <div
            className="bg-pink-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-pink-900 border border-pink-300 flex flex-col"
            key={note.id}
          >
            <h3 className="mb-3 text-pink-800 font-bold text-xl">{note.judul}</h3>
            <p className="leading-relaxed whitespace-pre-wrap">{note.isi}</p>
            <button
              onClick={() => handleEdit(note)}
              className=""
            > EDIT
            </button>
            <button
              onClick={() => handleDelete(note.id)}
              className=""
            > DELETE
            </button>
          </div>
        ))}
      </div>

      {/* Button Tambah Note */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => { resetForm(); setShowModal(true) }}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full py-4 px-8 shadow-xl shadow-pink-500/30 transition-transform hover:scale-105 flex items-center gap-2 font-bold text-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Note
        </button>
      </div>

      {/* Form Modal (Digabung ke dalam Home seperti logika kodemu yang kedua) */}
      {showModal && (
        <div className="fixed inset-0 bg-pink-950/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-pink-100 w-full max-w-md relative">

            {/* Tombol Close Modal */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-pink-400 hover:text-pink-600 transition-colors bg-pink-50 hover:bg-pink-100 rounded-full p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="mb-6 text-pink-600 font-extrabold text-2xl text-center">
              {isEdit ? "Edit Note" : "Buat Note Baru"}
            </h2>

            {/* Form disubmit memanggil simpanArrowFunction */}
            <form onSubmit={simpanArrowFunction} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-pink-700 ml-1">Judul Note</label>
                <input
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  type="text"
                  placeholder="Masukkan judul..."
                  className="w-full px-4 py-3 bg-pink-50 border border-transparent focus:border-pink-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-100 text-pink-900 placeholder-pink-300 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-pink-700 ml-1">Isi Note</label>
                <textarea
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  placeholder="Tuliskan sesuatu di sini..."
                  rows="5"
                  className="w-full px-4 py-3 bg-pink-50 border border-transparent focus:border-pink-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-100 text-pink-900 placeholder-pink-300 resize-none transition-all"
                ></textarea>
              </div>

              {/* Tombol */}
              <button
                type="submit"
                className="w-full py-3.5 mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-500/20 active:scale-95 text-lg"
              >
                {isEdit ? "Update" : "Simpan Note"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}