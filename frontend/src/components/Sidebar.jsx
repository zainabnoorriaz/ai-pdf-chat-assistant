import { useEffect, useRef, useState } from "react";
import api from "../services/api";

function Sidebar({ selectedPdf, setSelectedPdf }) {

  const [pdfs, setPdfs] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);


  useEffect(() => {

    fetchPDFs();

  }, []);



  async function fetchPDFs() {

    try {

      const response = await api.get("/pdfs");

      setPdfs(response.data);


    } catch (error) {

      console.error("Error loading PDFs:", error);

    }

  }




  async function handleUpload(event) {

    const file = event.target.files[0];

    if (!file) return;


    setUploading(true);



    const formData = new FormData();

    formData.append("file", file);



    try {


      const response = await api.post(

        "/upload",

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }

      );



      alert(response.data.message);



      await fetchPDFs();



      setSelectedPdf({

        pdf_id: response.data.pdf_id,

        filename: response.data.filename,

      });



      event.target.value = "";



    } catch (error) {


      console.error("Upload error:", error);


      alert("Upload failed.");



    } finally {


      setUploading(false);


    }

  }





  async function handleDelete(pdfId) {


    const confirmDelete = window.confirm(

      "Are you sure you want to delete this PDF?"

    );



    if (!confirmDelete) return;



    try {


      await api.delete(`/delete/${pdfId}`);



      await fetchPDFs();



      if (selectedPdf?.pdf_id === pdfId) {

        setSelectedPdf(null);

      }



    } catch (error) {


      console.error("Delete error:", error);


      alert("Failed to delete PDF.");

    }

  }






  return (


    <aside className="sidebar">



      <div className="logo-section">


        <div className="logo-icon">

          ✨

        </div>



        <h1>

          DocMind AI

        </h1>



        <p>

          Your intelligent PDF workspace

        </p>



      </div>






      <button

        className="upload-btn"

        disabled={uploading}

        onClick={() => fileInputRef.current.click()}

      >

        {uploading

          ? "⏳ Uploading..."

          : "📤 Upload Document"

        }


      </button>






      <input


        type="file"


        accept=".pdf"


        ref={fileInputRef}


        style={{ display: "none" }}


        onChange={handleUpload}


      />







      <div className="documents">



        <h3>

          Recent Documents

        </h3>





        {pdfs.length === 0 ? (



          <p>

            No PDFs uploaded yet.

          </p>



        ) : (



          pdfs.map((pdf) => (



            <div


              key={pdf.pdf_id}


              className={

                selectedPdf?.pdf_id === pdf.pdf_id

                  ? "pdf-card active"

                  : "pdf-card"

              }


              onClick={() => setSelectedPdf(pdf)}


            >




              <div className="pdf-icon">

                📄

              </div>





              <div className="pdf-info">


                <h4>

                  {pdf.filename}

                </h4>



                <p>

                  Ready to chat

                </p>



              </div>






              <button


                className="delete-btn"


                onClick={(e) => {


                  e.stopPropagation();


                  handleDelete(pdf.pdf_id);



                }}


              >


                🗑️


              </button>





            </div>



          ))



        )}




      </div>







      <div className="sidebar-footer">



        <div className="footer-line"></div>



        <p>

          Powered by Gemini AI

        </p>



        <span>

          Version 1.0

        </span>



      </div>





    </aside>



  );

}



export default Sidebar;