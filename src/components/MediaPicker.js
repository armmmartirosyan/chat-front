import React from 'react';
const { REACT_APP_API_URL } = process.env;

function MediaPicker(props) {
  const { file } = props;

  return (
    <>
      {
        ['image/png', 'image/jpeg'].includes(file.mimetype) ? (
          <img
            src={`${REACT_APP_API_URL}/${file.name}`}
            className='msg-send-img'
            alt=""
          />
        ) : null
      }
      {
        ['audio/ogg', 'audio/mpeg', 'audio/mp3'].includes(file.mimetype) ? (
          <audio
            className='msg-send-audio'
            controls
          >
            <source src={`${REACT_APP_API_URL}/${file.name}`}
                    type={file.mimetype} />
          </audio>
        ) : null
      }
      {
        ['video/mp4', 'video/ogg'].includes(file.mimetype) ? (
          <video
            className='msg-send-video'
            controls
          >
            <source
              src={`${REACT_APP_API_URL}/${file.name}`}
              type={file.mimetype}
            />
          </video>
        ) : null
      }
      {
        !['image/png', 'image/jpeg', 'audio/ogg', 'audio/mpeg', 'audio/mp3', 'video/mp4', 'video/ogg'].includes(file.mimetype) ? (
          <a
            href={`${REACT_APP_API_URL}/${file.name}`}
            target='_blank'
            className='upload-file-link'
          >
            {`📄${file.originalName}`}
          </a>
        ) : null
      }
    </>
  );
}

export default MediaPicker;

// if (['image/png', 'image/jpeg'].includes(file.mimetype)) {
//     return (
//         <img
//             key={file.id}
//             src={`${REACT_APP_API_URL}/${file.name}`}
//             className='msg-send-img'
//             alt=""
//         />
//     )
// } else if (['audio/ogg', 'audio/mpeg'].includes(file.mimetype)) {
//     return (
//         <audio
//             key={file.id}
//             className='msg-send-audio'
//             controls
//         >
//             <source src={`${REACT_APP_API_URL}/${file.name}`}
//                     type={file.mimetype}/>
//         </audio>
//     )
// } else if (['video/mp4', 'video/ogg'].includes(file.mimetype)) {
//     return (
//         <video
//             key={file.id}
//             className='msg-send-video'
//             controls
//         >
//             <source
//                 src={`${REACT_APP_API_URL}/${file.name}`}
//                 type={file.mimetype}
//             />
//         </video>
//     )
// }else{
//     return(
//         <a href={`${REACT_APP_API_URL}/${file.name}`} key={file.id} target='_blank'>
//             {`📄${file.originalName}`}
//         </a>
//     )
// }
