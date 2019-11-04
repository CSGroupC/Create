
// NOTE: The sole purpose of this class is to provide a constructor to create a 
//       custom HTMLElement object from an HTML string. It is dangerous to define
//       any other properties or methods in this class.
export class CustomElement extends HTMLElement {
    constructor(html) {
        let template = document.createElement("template");
        // Prevent returning a text node of whitespace as the result
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    }
}
