//  External Dependencies
import { useRef } from 'react';

//  Internal Dependencies
import { PDFUploaderProps } from './PDFUploader.types';
import { PDFUploaderContainer } from './PDFUploaderContainer.styled';

const PDFUploader = ({ fileName = '', setFile }: PDFUploaderProps) => {
  const fileInput = useRef(null);

  //  Handles the click of Button
  const onButtonClick = () => {
    (fileInput.current! as HTMLButtonElement).click();
  };

  return (
    <PDFUploaderContainer>
      <button
        className="btn btn-sm btn-primary"
        onClick={(e) => onButtonClick()}
      >
        {fileName ? 'Replace' : 'Select'}
      </button>
      <input
        ref={fileInput}
        type="file"
        name="file"
        accept=".pdf"
        onChange={(e: any) => setFile(e.target.files[0])}
      />
    </PDFUploaderContainer>
  );
};

export default PDFUploader;
