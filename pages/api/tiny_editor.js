"use client";
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

const TinyMceContainer = (props) => {
  const [bodyText, setBodyText] = useState("");
  console.log(bodyText);

  return (
    <Editor
      apiKey="4sn3xmrbx9qp502lmio9ce9bjobx7f2iop67azbgzic6owc6"
      init={{
        plugins:
          "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        statusbar: false,
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        ai_request: (request, respondWith) =>
          respondWith.string(() =>
            Promise.reject("See docs to implement AI Assistant")
          ),
      }}
      initialValue="내용 입력"
      onEditorChange={props.setBodyText}
    />
  );
};

export default TinyMceContainer;
