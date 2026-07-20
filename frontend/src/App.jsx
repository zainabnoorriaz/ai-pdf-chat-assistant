import { useEffect, useState } from "react";
import "./index.css";
import Sidebar from "./components/Sidebar";
import MessageBubble from "./components/MessageBubble";
import api from "./services/api";

function App() {

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);



  useEffect(() => {

    if (selectedPdf) {

      loadChatHistory(selectedPdf.pdf_id);

    } else {

      setMessages([]);

    }

  }, [selectedPdf]);




  async function handleSend() {

    if (!question.trim()) return;

    if (!selectedPdf) return;


    setLoading(true);


    try {

      const response = await api.post("/chat", {

        pdf_id: selectedPdf.pdf_id,

        question: question

      });



      setMessages((previous) => [

        ...previous,

        {
          role: "user",
          text: question
        },

        {
          role: "assistant",
          text: response.data.answer
        }

      ]);


      setQuestion("");


    } catch (error) {

      console.error(error);

      alert("Failed to send message.");


    } finally {

      setLoading(false);

    }

  }




  async function handleSuggestion(text) {

    if (!selectedPdf) return;


    setLoading(true);


    try {

      const response = await api.post("/chat", {

        pdf_id: selectedPdf.pdf_id,

        question: text

      });



      setMessages((previous) => [

        ...previous,

        {
          role: "user",
          text: text
        },

        {
          role: "assistant",
          text: response.data.answer
        }

      ]);


    } catch (error) {

      console.error(error);

      alert("Failed to send suggestion.");


    } finally {

      setLoading(false);

    }

  }





  async function loadChatHistory(pdfId) {

    try {

      const response = await api.get(`/chat/${pdfId}`);


      const formattedMessages = response.data.map((message) => ({

        role: message.role,

        text: message.message

      }));


      setMessages(formattedMessages);


    } catch (error) {

      console.error(
        "Error loading chat history:",
        error
      );


      setMessages([]);

    }

  }




  return (

    <div className="app">


      <Sidebar

        selectedPdf={selectedPdf}

        setSelectedPdf={setSelectedPdf}

      />



      <main className="chat-area">


        <div className="chat-header">


          <h2>

            {selectedPdf

              ? `📄 ${selectedPdf.filename}`

              : "🤖 Welcome to DocMind AI"

            }

          </h2>



          <p>

            {selectedPdf

              ? "Ask anything about this document."

              : "Upload a PDF or select one from the sidebar to begin."

            }

          </p>


        </div>




        <div className="messages">


          {messages.length === 0 ? (


            <div className="empty-chat">


              <div className="empty-icon">

                📚

              </div>



              <h1>

                Chat with your PDFs

              </h1>



              <p>

                Upload a PDF and ask questions about its contents.
                DocMind AI searches your document and answers using only
                the information inside it.

              </p>




              <div className="suggestions">



                <div

                  className="suggestion-card"

                  onClick={() =>
                    handleSuggestion(
                      "Summarize this document"
                    )
                  }

                >

                  📄 Summarize this document

                </div>




                <div

                  className="suggestion-card"

                  onClick={() =>
                    handleSuggestion(
                      "Explain chapter 3"
                    )
                  }

                >

                  💡 Explain chapter 3

                </div>




                <div

                  className="suggestion-card"

                  onClick={() =>
                    handleSuggestion(
                      "List key concepts from this document"
                    )
                  }

                >

                  🎯 List key concepts

                </div>




                <div

                  className="suggestion-card"

                  onClick={() =>
                    handleSuggestion(
                      "Generate interview questions from this document"
                    )
                  }

                >

                  ❓ Generate interview questions

                </div>



              </div>


            </div>



          ) : (



            messages.map((message, index) => (


              <MessageBubble

                key={index}

                role={message.role}

                text={message.text}

              />


            ))



          )}



        </div>





        <div className="chat-input">


          <input

            type="text"

            placeholder="Ask anything about your document..."

            value={question}

            onChange={(e) =>
              setQuestion(e.target.value)
            }

          />



          <button

            onClick={handleSend}

            disabled={!selectedPdf || loading}

          >

            {loading ? "Thinking..." : "Send"}


          </button>



        </div>



      </main>



    </div>

  );

}


export default App;