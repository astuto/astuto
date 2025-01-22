import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import I18n from 'i18n-js';
import { SmallMutedText } from './CustomTexts';

interface Props {
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  onDrop?: any;
  maxSizeKB?: number;
  maxFiles?: number;
}

const Dropzone = ({
  files,
  setFiles,
  onDrop,
  maxSizeKB = 256,
  maxFiles = 1,
}: Props) => {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/jpg': [],
    },
    maxSize: maxSizeKB * 1024,
    maxFiles: maxFiles,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        alert(I18n.t('common.errors.invalid_file', { errors: fileRejections.map(rejection => rejection.errors[0].message).join(', ') }));
      }

      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      if (onDrop) {
        onDrop(acceptedFiles);
      }
    },
  });
  
  const thumbnails = files.map(file => (
    <div className="thumbnail" key={file.name}>
      <div className="thumbnailInner">
        <img
          src={file.preview}
          className="thumbnailImage"
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section>
      <div {...getRootProps({className: 'dropzone' + (isDragAccept ? ' dropzone-accept' : isDragReject ? ' dropzone-reject' : '')})}>
        <input {...getInputProps()} />
        <SmallMutedText>{I18n.t('common.drag_and_drop', { maxCount: maxFiles, maxSize: maxSizeKB })}</SmallMutedText>
      </div>
      <aside className="thumbnailsContainer">
        {thumbnails}
      </aside>
    </section>
  );
}

export default Dropzone;