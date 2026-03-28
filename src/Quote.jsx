import React, { useState, useRef } from "react";

function Quote() {

    const [quote, setQuote] = useState(
        "Click on New Quote to discover inspirational quotes!"
    );
    const [author, setAuthor] = useState("");
    const [language, setLanguage] = useState("en");
    const [originalQuote, setOriginalQuote] = useState(quote);

    function fetchQuote() {
        fetch("https://api.api-ninjas.com/v1/quotes", {
            headers: {
                // "X-Api-Key": "hidden",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const q = data[0].quote;
                const a = data[0].author;

                setOriginalQuote(q);
                setQuote(q);
                setAuthor(a);
            })
            .catch((error) => console.error("Fetch error:", error));
    }

    async function translateQuote() {
        if (language === "en") {
            setQuote(originalQuote);
            return;
        }

        try {
            const response = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
                    originalQuote
                )}&langpair=en|${language}`
            );

            const data = await response.json();
            const translated = data.responseData.translatedText;
            setQuote(translated);
        } catch (error) {
            console.error("Translation error:", error);
        }
    }

    function copy() {
        const fullText = `${quote} — ${author}`;
        navigator.clipboard
            .writeText(fullText)
            .then(() => alert("Quote copied to clipboard!"))
            .catch((err) => console.error("Copy failed:", err));
    }


    return (
        <>
            <div className="quoteGenerator">
                <div className="container">
                    <p className="quote">
                        <i className="fas fa-quote-left"></i> {quote}{" "}
                        <i className="fas fa-quote-right"></i>
                    </p>
                    <p className="author">
                        {author !== "" ? `— ${author}` : ""}
                    </p>
                </div>

                <div className="options">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="language-select"
                    >
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="ar">Arabic</option>
                    </select>

                    <button className="translate btn" onClick={translateQuote} title="Click to translate the quote.">
                        <i className="fa-solid fa-language"></i>
                    </button>

                    <button className="copy btn" onClick={copy} title="Click to copy the quote.">
                        <i className="fa-solid fa-copy"></i>
                    </button>

               
                </div>
            </div>

            <div className="button">
                <button onClick={fetchQuote} className="generate">
                    New Quote
                </button>
            </div>
        </>
    );
}

export default Quote;
