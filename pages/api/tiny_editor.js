import { Editor } from "@tinymce/tinymce-react";

const TinyMceContainer = (props) => {
  const image_upload_handler = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open("POST", "postAcceptor.php");

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: "HTTP Error: " + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject("HTTP Error: " + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location != "string") {
          reject("Invalid JSON: " + xhr.responseText);
          return;
        }

        resolve(json.location);
      };

      xhr.onerror = () => {
        reject(
          "Image upload failed due to a XHR Transport error. Code: " +
            xhr.status
        );
      };

      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });

  let dataItem = props.dataItem;

  return (
    <Editor
      apiKey="4sn3xmrbx9qp502lmio9ce9bjobx7f2iop67azbgzic6owc6"
      init={{
        selector: "textarea#file-picker",
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
        statusbar: false,
        autocomplete: false,
        forced_root_block: false,
        force_br_newlines: true,
        force_p_newlines: false,
        autoresize_bottom_margin: 0,
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image",
        images_upload_handler: image_upload_handler,
        file_picker_callback: (cb, value, meta) => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          input.addEventListener("change", (e) => {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.addEventListener("load", () => {
              /*
                Note: Now we need to register the blob in TinyMCEs image blob
                registry. In the next release this part hopefully won't be
                necessary, as we are looking to handle it internally.
              */
              const id = "blobid" + new Date().getTime();
              const blobCache = tinymce.activeEditor.editorUpload.blobCache;
              const base64 = reader.result.split(",")[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              /* call the callback and populate the Title field with the file name */
              cb(blobInfo.blobUri(), { title: file.name });
            });
            reader.readAsDataURL(file);
          });

          input.click();
        },
      }}
      initialValue={dataItem && dataItem.communityId ? dataItem.body : ""}
      onEditorChange={(content, editor) => {
        console.log("에디터 내용 변경:", content);
        props.setBodyText(content);
      }}
    />
  );
};

export default TinyMceContainer;
