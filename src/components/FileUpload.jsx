import React, { useState } from 'react';

export function FileUpload({ onFileUploaded }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const fileData = {
        name: file.name,
        type: file.type,
        size: (file.size / 1024).toFixed(1) + ' KB',
        dataUrl: reader.result
      };
      
      setPreview(fileData.dataUrl);
      if (onFileUploaded) onFileUploaded(fileData);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: '20px', border: '2px dashed #ccc', borderRadius: '8px', textAlign: 'center' }}>
      <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload-input" />
      <label htmlFor="file-upload-input" style={{ cursor: 'pointer', color: '#0066cc', textDecoration: 'underline' }}>
        Click to upload an assignment file
      </label>
      
      {preview && (
        <div style={{ marginTop: '15px', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Preview Component:</p>
          {preview.startsWith('data:image/') ? (
            <img src={preview} alt="Upload preview" style={{ maxHeight: '120px', maxWidth: '100%', borderRadius: '4px', objectFit: 'cover' }} />
          ) : (
            <div style={{ fontSize: '12px', color: '#666' }}>📄 Preview not available for this file type</div>
          )}
        </div>
      )}
    </div>
  );
}