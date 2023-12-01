"use client";
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMceContainer = (props) => {
  return (
    <Editor
      apiKey="4sn3xmrbx9qp502lmio9ce9bjobx7f2iop67azbgzic6owc6"
      init={{
        plugins:
          "mentions anchor autolink charmap codesample emoticons link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker a11ychecker typography inlinecss",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        statusbar: false,
        autocomplete: false,
        forced_root_block: false,
        force_br_newlines: true,
        force_p_newlines: false,
        autoresize_bottom_margin: 0,
        // tinycomments_mode: "embedded",
        // tinycomments_author: "Author name",
        // mergetags_list: [
        //   { value: "First.Name", title: "First Name" },
        //   { value: "Email", title: "Email" },
        // ],
        // ai_request: (request, respondWith) =>
        //   respondWith.string(() =>
        //     Promise.reject("See docs to implement AI Assistant")
        //   ),
      }}
      initialValue=""
      onEditorChange={(content, editor) => {
        console.log("에디터 내용 변경:", content);
        props.setBodyText(content);
      }}
    />
  );
};

export default TinyMceContainer;
