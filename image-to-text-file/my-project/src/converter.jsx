import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { saveAs } from 'file-saver';

export default function ImageTextExtractor() {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setExtractedText('');
      };
      reader.readAsDataURL(file);
    }
  };

  const extractText = async () => {
    if (!image) return;
    setLoading(true);
    setProgress(0);
    try {
      const { data: { text } } = await Tesseract.recognize(image, 'eng', {
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });
      setExtractedText(text);
    } catch (error) {
      console.error('OCR Error:', error);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'extracted-text.txt');
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(extractedText);
    alert('Text copied to clipboard!');
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '30px auto', 
      fontFamily: 'Arial, sans-serif', 
      color: '#222' 
    }}>
      <h1 style={{ fontWeight: '600', fontSize: '1.8rem', marginBottom: '24px', textAlign: 'center' }}>
        Image Text Extractor
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{
          display: 'block',
          margin: '0 auto 20px auto',
          padding: '8px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          cursor: 'pointer',
          width: '100%'
        }}
      />

      {image && (
        <img
          src={image}
          alt="Preview"
          style={{ 
            display: 'block', 
            maxWidth: '100%', 
            maxHeight: '280px', 
            objectFit: 'contain', 
            margin: '0 auto 24px auto',
            borderRadius: '6px',
            boxShadow: '0 0 6px rgba(0,0,0,0.1)' 
          }}
        />
      )}

      <button
        onClick={extractText}
        disabled={!image || loading}
        style={{
          display: 'block',
          width: '100%',
          padding: '12px',
          background: loading ? '#ccc' : '#222',
          color: '#fff',
          fontWeight: '600',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: loading ? '12px' : '24px',
          transition: 'background-color 0.3s ease'
        }}
      >
        {loading ? `Extracting... ${progress}%` : 'Extract Text'}
      </button>

      {loading && (
        <div style={{ 
          height: '6px', 
          background: '#e0e0e0', 
          borderRadius: '4px', 
          overflow: 'hidden', 
          marginBottom: '24px' 
        }}>
          <div style={{ 
            width: `${progress}%`, 
            height: '100%', 
            background: '#222', 
            transition: 'width 0.3s ease' 
          }} />
        </div>
      )}

      {extractedText && (
        <>
          <textarea
            readOnly
            value={extractedText}
            rows={8}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontFamily: 'monospace',
              fontSize: '1rem',
              resize: 'vertical',
              color: '#333',
              background: '#fafafa',
              marginBottom: '20px'
            }}
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={downloadText}
              style={{
                flex: 1,
                padding: '12px',
                background: '#222',
                color: '#fff',
                fontWeight: '600',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            >
              Download TXT
            </button>
            <button
              onClick={copyToClipboard}
              style={{
                flex: 1,
                padding: '12px',
                background: '#666',
                color: '#fff',
                fontWeight: '600',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            >
              Copy Text
            </button>
          </div>
        </>
      )}
    </div>
  );
}
