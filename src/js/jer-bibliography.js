class Component{constructor(){this.rootElement,this.eventListeners=[]}setElement(e){this.rootElement=e}inflate(e,t){}deflate(){this.rootElement&&this.rootElement.parentElement&&(this.removeEventListeners(),this.rootElement.parentElement.removeChild(this.rootElement))}addEventListener(e,t,i){this.isElement(e)&&(e.addEventListener(t,i),this.eventListeners.push({el:e,type:t,listener:i}))}removeEventListeners(){let e,t;for(e=0;e<this.eventListeners.length;e++)(t=this.eventListeners[e]).el.removeEventListener(t.type,t.listener)}empty(e){if(this.isElement(e))for(;e.firstChild;)e.removeChild(e.firstChild)}isElement(e){return e instanceof Element||e instanceof HTMLDocument}proper(e){return e.charAt(0).toUpperCase()+e.slice(1)}capitalize(e){const t=e.split(" ");for(let e=0;e<t.length;e++)t[e]=this.proper(t[e]);return t.join(" ")}httpGet(e,t){const i=new XMLHttpRequest;i.open("GET",e,!0),i.setRequestHeader("Zotero-API-Key","GGqHsVvuFtE8TdggbBvqTj1r"),i.onload=function(){i.readyState===XMLHttpRequest.DONE&&i.status>=200&&i.status<400&&t(i)},i.send()}}class CitationList extends Component{constructor(e){super(),this.bibliography=e,this.listElement,this.items=[]}inflate(e,t){if(e&&t){const i=this.bibliography.sortVariable;let n,s,o,a,l,d;const r=document.createDocumentFragment();for(this.rootElement=document.createElement("div"),n=0;n<t.length;n++)s=new Citation(this,t[n].data),o=null,"creator"==i?s.authors&&s.authors.length>0&&(o=s.authors[0].lastName[0]):"title"==i?s.title&&(o=s.title[0]):"itemType"==i?s.itemType&&this.bibliography.itemTypes.hasOwnProperty(s.itemType)&&(o=this.bibliography.itemTypes[s.itemType]):"date"==i&&s.year&&(o=s.year),o&&o!=a&&((l=document.createElement("div")).className="bib-list-separator",l.appendChild(document.createTextNode(o)),this.rootElement.appendChild(l),(d=document.createElement("ol")).className="bib-citation-list",this.rootElement.appendChild(d),a=o),s.inflate(d),this.items.push(s);r.appendChild(this.rootElement),e.appendChild(r)}}deflate(){this.deflateContent(),this.items=[],super.deflate()}deflateContent(){if(this.rootElement){let e,t;for(e=0;e<this.items.length;e++)(t=this.items[e]).deflate()}}inflatePlaceholders(e,t){if(e){let i,n;const s=document.createDocumentFragment();this.rootElement=document.createElement("div");const o=document.createElement("div");o.className="bib-list-separator-placeholder load-placeholder",this.rootElement.appendChild(o);const a=document.createElement("ol");a.className="bib-citation-list";for(let e=0;e<t;e++)(i=document.createElement("div")).className="bib-citation",(n=document.createElement("div")).className="bib-citation-placeholder load-placeholder",i.appendChild(n),(n=document.createElement("div")).className="bib-citation-placeholder load-placeholder",i.appendChild(n),(n=document.createElement("div")).className="bib-citation-placeholder load-placeholder",i.appendChild(n),a.appendChild(i);this.rootElement.appendChild(a),s.appendChild(this.rootElement),e.appendChild(s)}}search(e){this.bibliography.search(e)}searchKeywords(e){this.bibliography.searchKeywords(e)}onSelection(e){this.bibliography.onSelection(e)}}class Citation extends Component{constructor(e,t){let i,n,s,o,a,l;super(),this.list=e,this.key=t.key,this.titleElement,this.title,this.itemType,this.year,this.authors=[];for(let e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);if(t.date){for(i=this.date.split(" "),n=0;n<i.length;n++)if(!isNaN(i[n])&&4==i[n].length){this.year=i[n];break}this.year||(i=this.date.split("/"),this.year=i[i.length-1])}if(t.creators)for(n=0;n<t.creators.length;n++)o=(s=t.creators[n]).lastName,s.firstName?(i=s.firstName.split(" ")).length>1?(a=i[0].trim().substring(0,1),l=i[1].trim().substring(0,1),o=s.lastName+" "+a+l):i.length>0&&(a=i[0].trim().substring(0,1),o=s.lastName+" "+a):s.fullName&&(o=s.fullName),this.authors.push({fullName:o,lastName:s.lastName})}inflate(e){const t=this,i=this.list.bibliography.isSimple;if(e){let n,s,o,a,l;const d=document.createDocumentFragment();if(this.rootElement=document.createElement("li"),this.rootElement.className="bib-citation",this.authors.length>0)if(i){for(l=document.createElement("span"),n=0;n<this.authors.length;n++)if(o=(s=this.authors[n]).fullName,n<this.authors.length-1&&(o+=", "),l.appendChild(document.createTextNode(o)),9==n){l.appendChild(document.createTextNode("et al"));break}this.rootElement.appendChild(l)}else for(n=0;n<this.authors.length;n++)if(o=(s=this.authors[n]).fullName,a=s.lastName,n<this.authors.length-1&&(o+=", "),(l=document.createElement("a")).href="#",l.appendChild(document.createTextNode(o)),this.rootElement.appendChild(l),this.addAuthorEventListeners(l,a),9==n){(l=document.createElement("span")).appendChild(document.createTextNode("et al")),this.rootElement.appendChild(l);break}if(this.year&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.year)),this.rootElement.appendChild(l)),this.title&&(this.rootElement.appendChild(document.createTextNode(". ")),this.titleElement=document.createElement("a"),this.titleElement.href="#",this.titleElement.className="bib-citation-title",this.italicize(this.titleElement,this.title),this.rootElement.appendChild(this.titleElement),this.addEventListener(this.titleElement,"click",function(e){e.preventDefault(),t.onSelection()}),this.addEventListener(this.titleElement,"keydown",function(e){13==e.keyCode&&(e.preventDefault(),t.onSelection())})),"book"==this.itemType)this.publisher&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.publisher)),this.rootElement.appendChild(l)),this.place&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.place)),this.rootElement.appendChild(l)),this.numPages&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.numPages+"pp")),this.rootElement.appendChild(l));else if("bookSection"==this.itemType)this.bookTitle&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.bookTitle)),this.rootElement.appendChild(l)),this.publisher&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.publisher)),this.rootElement.appendChild(l)),this.place&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.place)),this.rootElement.appendChild(l)),this.pages&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.pages)),this.rootElement.appendChild(l));else{if(this.publicationTitle&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.publicationTitle)),this.rootElement.appendChild(l)),this.proceedingsTitle&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.proceedingsTitle)),this.rootElement.appendChild(l)),this.conferenceName&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.conferenceName)),this.rootElement.appendChild(l)),this.publisher&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.publisher)),this.rootElement.appendChild(l)),this.place&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.place)),this.rootElement.appendChild(l)),this.volume&&(this.rootElement.appendChild(document.createTextNode(". ")),(l=document.createElement("span")).appendChild(document.createTextNode(this.volume)),this.rootElement.appendChild(l)),this.issue&&((l=document.createElement("span")).appendChild(document.createTextNode("("+this.issue+")")),this.rootElement.appendChild(l)),this.pages){let e;e=this.volume||this.issue?":"+this.pages:". "+this.pages,(l=document.createElement("span")).appendChild(document.createTextNode(e)),this.rootElement.appendChild(l)}this.rootElement.appendChild(document.createTextNode("."))}if(this.doi&&((l=document.createElement("a")).href="dx.doi.org/"+this.doi,l.target="_blank",l.appendChild(document.createTextNode(" DOI")),this.rootElement.appendChild(l)),this.title){let e="https://scholar.google.com/scholar?hl=en&q="+this.title;this.authors.length>0&&(e=e+"&as_sauthors="+this.authors[0].fullName),(l=document.createElement("a")).className="highlighted-link",l.href=e,l.target="_blank",l.appendChild(document.createTextNode(" Google Scholar")),this.rootElement.appendChild(l)}l=this.getExportLink("bibtex","BibTeX"),this.rootElement.appendChild(l),l=this.getExportLink("ris","RIS"),this.rootElement.appendChild(l),d.appendChild(this.rootElement),e.appendChild(d)}}addAuthorEventListeners(e,t){const i=this;this.addEventListener(e,"click",function(e){e.preventDefault(),i.search(t)}),this.addEventListener(e,"keydown",function(e){13==e.keyCode&&(e.preventDefault(),i.search(t))})}getExportLink(e,t){const i=this,n=document.createElement("a");return n.className="highlighted-link",n.href="#",n.appendChild(document.createTextNode(" "+t)),this.addEventListener(n,"click",function(t){t.preventDefault(),i.exportCitation(e)}),this.addEventListener(n,"keydown",function(t){13==t.keyCode&&(t.preventDefault(),i.exportCitation(e))}),n}search(e){this.list.search(e)}onSelection(){this.list.onSelection(this)}exportCitation(e){let t,i="https://api.zotero.org/users/10063140/items/"+this.key;"bibtex"==e?(i+="?format=bibtex&v=3",t="citations.bib"):"ris"==e&&(i+="?format=ris&v=3",t="citations.ris"),i&&this.httpGet(i,function(e){const i=document.createElement("a");i.setAttribute("href","data:text;charset=utf-8,"+encodeURIComponent(e.response)),i.setAttribute("download",t),i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i)})}italicize(e,t){const i=["<i>","</i>"];let n,s,o;if(e&&t){const a=this.splitContent([t],i,0);for(n=0;n<a.length;n++)"<i>"==(s=a[n])?o=document.createElement("i"):"</i>"==s?(e.appendChild(o),o=null):o?o.appendChild(document.createTextNode(s)):e.appendChild(document.createTextNode(s))}}splitContent(e,t,i){let n,s,o,a,l,d,r=[];if(t&&i<t.length)for(s=t[i],i++,n=0;n<e.length;n++){for(o=e[n].split(s),a=[],d=0;d<o.length;d++)a.push(o[d]),d<o.length-1&&a.push(s);for(l=this.splitContent(a,t,i),d=0;d<l.length;d++)l[d]&&r.push(l[d])}else r=e;return r}}class CitationPopup extends Component{constructor(e){super(),this.bibliography=e,this.contentElement,this.closeElement,this.closeFunction}inflate(e){const t=this;if(e){const i=document.createDocumentFragment();this.rootElement=document.createElement("div"),this.rootElement.id="bib-popup-overlay",this.contentElement=document.createElement("div"),this.contentElement.id="bib-popup-content",this.closeElement=document.createElement("div"),this.closeElement.id="bib-popup-close-button",this.closeElement.role="button",this.closeElement.tabIndex=0,this.closeElement.setAttribute("aria-label","Close"),this.closeElement.title="Close",this.contentElement.appendChild(this.closeElement),this.addEventListener(this.closeElement,"click",function(e){t.closePopup()}),this.addEventListener(this.closeElement,"keydown",function(e){13!=e.keyCode&&32!=e.keyCode||t.closePopup()}),this.rootElement.appendChild(this.contentElement),i.appendChild(this.rootElement),e.appendChild(i)}}deflate(){this.citationTable.deflate(),super.deflate()}openPopup(e,t){this.closeFunction=t,this.rootElement.classList.add("active"),this.rootElement.setAttribute("aria-hidden","false"),this.citationTable=new CitationTable(this,e,this.bibliography.itemTypes,this.bibliography.itemFields),this.citationTable.inflate(this.contentElement)}closePopup(){this.rootElement.classList.remove("active"),this.rootElement.setAttribute("aria-hidden","true"),this.closeFunction&&this.closeFunction(),this.citationTable.deflate()}search(e){this.bibliography.search(e),this.closePopup()}searchKeywords(e){this.bibliography.searchKeywords(e),this.closePopup()}}class CitationTable extends Component{constructor(e,t,i,n){super(),this.popup=e,this.citation=t,this.itemTypes=i,this.itemFields=n}inflate(e){const t=this.popup.bibliography.isSimple;if(e&&this.citation){const i=document.createDocumentFragment();this.rootElement=document.createElement("div"),this.rootElement.id="bib-table-container";const n=document.createElement("h1");n.id="bib-table-title",this.italicize(n,this.citation.title),this.rootElement.appendChild(n);const s=document.createElement("table");let o,a,l,d,r,h,c,p,m,u,E,b;s.id="bib-table";for(let e in this.citation)if(this.citation.hasOwnProperty(e))if(o=this.citation[e],"itemType"==e&&this.itemTypes.hasOwnProperty(o))a=this.itemTypes[o],l=document.createElement("tr"),(d=document.createElement("th")).appendChild(document.createTextNode("Publication Type")),l.appendChild(d),(r=document.createElement("td")).appendChild(document.createTextNode(a)),l.appendChild(r),s.appendChild(l);else if("title"==e||"abstractNote"==e)a=this.itemFields[e],o&&(o=(o=o.replaceAll("<p>","")).replaceAll("</p>",""),l=document.createElement("tr"),(d=document.createElement("th")).appendChild(document.createTextNode(a)),l.appendChild(d),r=document.createElement("td"),this.italicize(r,o),l.appendChild(r),s.appendChild(l));else if("authors"==e){if(l=document.createElement("tr"),(d=document.createElement("th")).appendChild(document.createTextNode("Authors")),l.appendChild(d),r=document.createElement("td"),t){for(E=document.createElement("span"),h=0;h<o.length;h++)if(p=(c=o[h]).fullName,h<o.length-1&&(p+=", "),E.appendChild(document.createTextNode(p)),9==h){E.appendChild(document.createTextNode("et al."));break}r.appendChild(E)}else for(h=0;h<o.length;h++)if(p=(c=o[h]).fullName,m=c.lastName,(u=document.createElement("a")).href="#",u.appendChild(document.createTextNode(p)),r.appendChild(u),this.addAuthorEventListeners(u,m),h<o.length-1&&((E=document.createElement("a")).appendChild(document.createTextNode(", ")),r.appendChild(E)),9==h){(u=document.createElement("span")).appendChild(document.createTextNode("et al.")),r.appendChild(u);break}l.appendChild(r),s.appendChild(l)}else if("tags"==e&&o.length>0){if(l=document.createElement("tr"),(d=document.createElement("th")).appendChild(document.createTextNode("Keywords")),l.appendChild(d),r=document.createElement("td"),t){for(E=document.createElement("span"),h=0;h<o.length;h++)b=o[h].tag,h<o.length-1&&(b+=", "),E.appendChild(document.createTextNode(b));r.appendChild(E)}else for(h=0;h<o.length;h++)b=o[h].tag,(u=document.createElement("a")).href="#",u.appendChild(document.createTextNode(b)),r.appendChild(u),this.addTagEventListeners(u,b),h<o.length-1&&((E=document.createElement("a")).appendChild(document.createTextNode(", ")),r.appendChild(E));l.appendChild(r),s.appendChild(l)}else"url"==e?(a=this.itemFields[e],o&&(l=document.createElement("tr"),(d=document.createElement("th")).appendChild(document.createTextNode(a)),l.appendChild(d),r=document.createElement("td"),(u=document.createElement("a")).href=o,u.target="_blank",u.appendChild(document.createTextNode(o)),r.appendChild(u),l.appendChild(r),s.appendChild(l))):this.itemFields.hasOwnProperty(e)&&(a=this.itemFields[e],o&&(l=document.createElement("tr"),(d=document.createElement("th")).appendChild(document.createTextNode(a)),l.appendChild(d),(r=document.createElement("td")).appendChild(document.createTextNode(o)),l.appendChild(r),s.appendChild(l)));this.rootElement.appendChild(s),i.appendChild(this.rootElement),e.appendChild(i)}}addAuthorEventListeners(e,t){const i=this;this.addEventListener(e,"click",function(e){e.preventDefault(),i.search(t)}),this.addEventListener(e,"keydown",function(e){13==e.keyCode&&(e.preventDefault(),i.search(t))})}addTagEventListeners(e,t){const i=this;this.addEventListener(e,"click",function(e){e.preventDefault(),i.searchKeywords(t)}),this.addEventListener(e,"keydown",function(e){13==e.keyCode&&(e.preventDefault(),i.searchKeywords(t))})}search(e){this.popup.search(e)}searchKeywords(e){this.popup.searchKeywords(e)}italicize(e,t){const i=["<i>","</i>"];let n,s,o;if(e&&t){const a=this.splitContent([t],i,0);for(n=0;n<a.length;n++)"<i>"==(s=a[n])?o=document.createElement("i"):"</i>"==s?(e.appendChild(o),o=null):o?o.appendChild(document.createTextNode(s)):e.appendChild(document.createTextNode(s))}}splitContent(e,t,i){let n,s,o,a,l,d,r=[];if(t&&i<t.length)for(s=t[i],i++,n=0;n<e.length;n++){for(o=e[n].split(s),a=[],d=0;d<o.length;d++)a.push(o[d]),d<o.length-1&&a.push(s);for(l=this.splitContent(a,t,i),d=0;d<l.length;d++)l[d]&&r.push(l[d])}else r=e;return r}}class Filter extends Component{constructor(e,t,i){super(),this.bibliography=e,this.type=t,this.label=i}inflate(e){const t=this;if(e){const i=document.createDocumentFragment();this.rootElement=document.createElement("div"),this.rootElement.className="bib-filter",this.rootElement.role="button",this.rootElement.tabIndex=0,this.rootElement.setAttribute("aria-label","Remove filter"),this.rootElement.appendChild(document.createTextNode(this.label)),this.addEventListener(this.rootElement,"click",function(e){e.preventDefault(),t.remove()}),this.addEventListener(this.rootElement,"keydown",function(e){13==e.keyCode&&(e.preventDefault(),t.remove())}),i.appendChild(this.rootElement),e.appendChild(i)}}remove(){this.bibliography.removeFilter(this.type),this.deflate()}}class Bibliography extends Component{constructor(e){if(super(),this.container=document.querySelector(e),!this.container)throw"Invalid container selector";this.filterElement,this.sortAuthorElement,this.sortTitleElement,this.sortTypeElement,this.sortYearElement,this.totalElement,this.listElement,this.previousButtonElement,this.nextButtonElement,this.pageElement,this.filter,this.keywordFilter,this.citationList=new CitationList(this,!1),this.citationPopup=new CitationPopup(this,!1),this.itemTypes={},this.itemFields={},this.isSimple=!1,this.sortVariable="date",this.sortDirection="desc",this.start=0,this.itemsPerPage=50,this.total,this.q,this.tag,this.loadItemTypes(),this.loadItemFields()}inflate(){const e=this,t=document.createDocumentFragment();this.rootElement=document.createElement("div"),this.rootElement.id="bib";const i=document.createElement("form");i.id="bib-controls";let n=document.createElement("div");n.className="bib-search-control";let s=document.createElement("label");s.className="bib-search-label",s.setAttribute("for","bib-name-title-search-box"),s.appendChild(document.createTextNode("Search Title, Author, or Year")),n.appendChild(s);let o=document.createElement("div");o.id="bib-name-title-search-box",o.className="bib-search-box";const a=document.createElement("input");a.className="bib-search-input",a.type="text",a.maxLength=500,o.appendChild(a),this.addEventListener(a,"keydown",function(t){13==t.keyCode&&e.search(a.value)});let l=document.createElement("div");l.className="bib-search-button",o.appendChild(l),this.addEventListener(l,"click",function(t){e.search(a.value)}),this.addEventListener(l,"keydown",function(t){13!=t.keyCode&&32!=t.keyCode||e.search(a.value)}),n.appendChild(o),i.appendChild(n),(n=document.createElement("div")).className="bib-search-control",(s=document.createElement("label")).className="bib-search-label",s.setAttribute("for","bib-tag-search-box"),s.appendChild(document.createTextNode("Search Keywords")),n.appendChild(s),(o=document.createElement("div")).id="bib-name-title-search-box",o.className="bib-search-box";const d=document.createElement("input");d.className="bib-search-input",d.type="text",d.maxLength=100,o.appendChild(d),this.addEventListener(d,"keydown",function(t){13==t.keyCode&&e.searchKeywords(d.value)}),(l=document.createElement("div")).className="bib-search-button",o.appendChild(l),this.addEventListener(l,"click",function(t){e.searchKeywords(d.value)}),this.addEventListener(l,"keydown",function(t){13!=t.keyCode&&32!=t.keyCode||e.searchKeywords(d.value)}),n.appendChild(o),i.appendChild(n),this.filterElement=document.createElement("div"),this.filterElement.id="bib-filters",i.appendChild(this.filterElement);const r=document.createElement("div");r.id="bib-sort-buttons",this.sortYearElement=this.getSortButton("year"),r.appendChild(this.sortYearElement),this.sortAuthorElement=this.getSortButton("author"),r.appendChild(this.sortAuthorElement),this.sortTitleElement=this.getSortButton("title"),r.appendChild(this.sortTitleElement),this.sortTypeElement=this.getSortButton("type"),r.appendChild(this.sortTypeElement),i.appendChild(r);const h=document.createElement("div");h.id="bib-summary-bar",this.totalElement=document.createElement("span"),h.appendChild(this.totalElement);let c=this.getExportLink("bibtex","BibTeX");h.appendChild(c),c=this.getExportLink("ris","RIS"),h.appendChild(c),i.appendChild(h),this.rootElement.appendChild(i),this.listElement=document.createElement("div"),this.listElement.id="bib-flex-content",this.rootElement.appendChild(this.listElement);const p=document.createElement("div");p.id="bib-footer",this.previousButtonElement=document.createElement("div"),this.previousButtonElement.className="bib-previous-page-button",this.previousButtonElement.role="button",this.previousButtonElement.tabIndex=0,this.previousButtonElement.appendChild(document.createTextNode("Previous")),p.appendChild(this.previousButtonElement),this.addEventListener(this.previousButtonElement,"click",function(t){e.loadPreviousPage()}),this.addEventListener(this.previousButtonElement,"keydown",function(t){13!=t.keyCode&&32!=t.keyCode||e.loadPreviousPage()}),this.nextButtonElement=document.createElement("div"),this.nextButtonElement.className="bib-next-page-button",this.nextButtonElement.role="button",this.nextButtonElement.tabIndex=0,this.nextButtonElement.appendChild(document.createTextNode("Next")),p.appendChild(this.nextButtonElement),this.addEventListener(this.nextButtonElement,"click",function(t){e.loadNextPage()}),this.addEventListener(this.nextButtonElement,"keydown",function(t){13!=t.keyCode&&32!=t.keyCode||e.loadNextPage()}),this.pageElement=document.createElement("div"),this.pageElement.id="bib-page-label",p.appendChild(this.pageElement),this.rootElement.appendChild(p),t.appendChild(this.rootElement),this.container.appendChild(t),this.citationPopup.inflate(this.rootElement)}getSortButton(e){const t=this,i=document.createElement("div");return i.className="bib-sort-button",i.role="button",i.title="Sort by "+e,i.setAttribute("aria-label","Sort by "+e),i.tabIndex=0,i.appendChild(document.createTextNode(this.proper(e))),this.addEventListener(i,"click",function(n){t.sort(i,e)}),this.addEventListener(i,"keydown",function(n){13!=n.keyCode&&32!=n.keyCode||t.sort(i,e)}),i}getExportLink(e,t){const i=this,n=document.createElement("a");return n.className="highlighted-link",n.href="#",n.appendChild(document.createTextNode(" "+t)),this.addEventListener(n,"click",function(t){t.preventDefault(),i.exportCitations(e)}),this.addEventListener(n,"keydown",function(t){13==t.keyCode&&(t.preventDefault(),i.exportCitations(e))}),n}deflate(){this.citationList.deflate(),this.citationPopup.deflate(),this.filter&&this.filter.deflate(),this.keywordFilter&&this.keywordFilter.deflate(),parent.deflate()}loadItemTypes(){const e=this;this.httpGet("https://api.zotero.org/itemTypes",function(t){const i=JSON.parse(t.response);let n,s;for(n=0;n<i.length;n++)s=i[n],e.itemTypes[s.itemType]=s.localized})}loadItemFields(){const e=this;this.httpGet("https://api.zotero.org/itemFields",function(t){const i=JSON.parse(t.response);let n,s;for(n=0;n<i.length;n++)s=i[n],e.itemFields[s.field]=s.localized})}search(e){this.q=e,e&&(this.filter&&this.filter.deflate(),this.addFilter("general"),this.start=0,this.loadCitations())}searchKeywords(e){this.tag=e,e&&(this.keywordFilter&&this.keywordFilter.deflate(),this.addFilter("keyword"),this.start=0,this.loadCitations())}addFilter(e){switch(e){case"general":this.filter=new Filter(this,e,this.q),this.filter.inflate(this.filterElement);break;case"keyword":this.keywordFilter=new Filter(this,e,this.tag),this.keywordFilter.inflate(this.filterElement)}}removeFilter(e){switch(e){case"general":this.filter.deflate(),this.filter=null,this.q=null,this.start=0,this.loadCitations();break;case"keyword":this.keywordFilter.deflate(),this.keywordFilter=null,this.tag=null,this.start=0,this.loadCitations()}}sort(e,t){let i=!1,n=["asc","desc"];switch(t){case"author":this.sortVariable="creator",i=!0;break;case"title":this.sortVariable="title",i=!0;break;case"type":this.sortVariable="itemType",i=!0;break;case"year":this.sortVariable="date",n=["desc","asc"],i=!0}e.classList.contains("active")?e.classList.contains("desc")?this.sortDirection="asc":this.sortDirection="desc":this.sortDirection=n[0],i&&(this.clearSortSelection(),e.classList.add("active"),"desc"==this.sortDirection&&e.classList.add("desc"),this.start=0,this.loadCitations())}clearSortSelection(){this.sortAuthorElement.classList.remove("active"),this.sortTitleElement.classList.remove("active"),this.sortTypeElement.classList.remove("active"),this.sortYearElement.classList.remove("active"),this.sortAuthorElement.classList.remove("desc"),this.sortTitleElement.classList.remove("desc"),this.sortTypeElement.classList.remove("desc"),this.sortYearElement.classList.remove("desc")}loadPreviousPage(){this.start-this.itemsPerPage>=0&&(this.start=this.start-this.itemsPerPage,this.loadCitations())}loadNextPage(){this.start+this.itemsPerPage<this.total&&(this.start=this.start+this.itemsPerPage,this.loadCitations())}loadCitations(){const e=this,t=this.buildURL();this.citationList.deflate(),this.citationList.inflatePlaceholders(this.listElement,this.itemsPerPage),this.empty||this.container.scrollIntoView(!0),this.empty=!1,this.httpGet(t,function(t){const i=JSON.parse(t.response);e.total=t.getResponseHeader("Total-Results"),e.totalElement.textContent=e.total+" results. Export citations shown:",e.citationList.deflate(),e.citationList.inflate(e.listElement,i),e.updatePageButtons()})}buildURL(){let e="https://api.zotero.org/users/10063140/items?";return this.q&&(e=e+"q="+this.q+"&"),this.tag&&(e=e+"tag="+this.tag+"&"),e=e+"sort="+this.sortVariable+"&direction="+this.sortDirection+"&start="+this.start+"&limit="+this.itemsPerPage+"&v=3"}updatePageButtons(){this.previousButtonElement.setAttribute("aria-disabled","false"),this.nextButtonElement.setAttribute("aria-disabled","false"),this.start-this.itemsPerPage<0&&this.previousButtonElement.setAttribute("aria-disabled","true"),this.start+this.itemsPerPage>=this.total&&this.nextButtonElement.setAttribute("aria-disabled","true");const e=this.start/this.itemsPerPage+1,t=Math.ceil(this.total/this.itemsPerPage);this.pageElement.textContent="Page "+e+" of "+t}onSelection(e){this.citationPopup.openPopup(e,function(){e.titleElement.focus()})}exportCitations(e){let t,i=this.buildURL();"bibtex"==e?(i+="&format=bibtex",t="citations.bib"):"ris"==e&&(i+="&format=ris",t="citations.ris"),i&&this.httpGet(i,function(e){const i=document.createElement("a");i.setAttribute("href","data:text;charset=utf-8,"+encodeURIComponent(e.response)),i.setAttribute("download",t),i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i)})}}const bibliography=new Bibliography("#bibliography");bibliography.inflate(),bibliography.sortYearElement.click();