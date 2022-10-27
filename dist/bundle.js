(()=>{"use strict";var e={d:(i,t)=>{for(var c in t)e.o(t,c)&&!e.o(i,c)&&Object.defineProperty(i,c,{enumerable:!0,get:t[c]})},o:(e,i)=>Object.prototype.hasOwnProperty.call(e,i)};function i(){const e=document.querySelectorAll(".mark, .selected, .eatable, .castling");for(let i=0;i<e.length;i++)e[i].classList.remove("mark","selected","eatable","castling")}function t(e){var i;null===(i=document.querySelector(`#cell-${e.i}-${e.j}`))||void 0===i||i.classList.add("red")}function c(e,i){let t=[];const c=[{i:1,j:-1},{i:1,j:1},{i:-1,j:-1},{i:-1,j:1}];for(let n=0;n<c.length;n++)for(let s=1;s<=8;s++){const r=s*c[n].i,l=s*c[n].j,a={i:e.i+r,j:e.j-l};if(a.i>7||a.i<0||a.j>7||a.j<0)break;if(!T(i,a)){B(i[a.i][a.j])||t.push(a);break}t.push(a)}return t}function n(e,i){let t=[];const c=[{i:-2,j:-1},{i:-2,j:1},{i:-1,j:2},{i:-1,j:-2},{i:1,j:-2},{i:1,j:2},{i:2,j:1},{i:2,j:-1}];for(let n=0;n<c.length;n++){const s=c[n].i,r=c[n].j,l={i:e.i+s,j:e.j+r};l.i>=0&&l.i<8&&l.j>=0&&l.j<8&&(T(i,l)?t.push(l):B(i[l.i][l.j])||t.push(l))}return t}function s(e,i,t=!1){let c=[];const n=[{i:1,j:-1},{i:1,j:1},{i:-1,j:-1},{i:-1,j:1},{i:-1,j:0},{i:1,j:0},{i:0,j:1},{i:0,j:-1}];for(let s=0;s<n.length;s++)for(let r=1;r<=8;r++){const l=r*n[s].i,a=r*n[s].j,o={i:e.i+l,j:e.j-a};if(o.i>7||o.i<0||o.j>7||o.j<0)break;if(!T(i,o)){const e=i[o.i][o.j];t||B(e)?t&&c.push(o):c.push(o);break}c.push(o)}return c}function r(e,i){let t=[];const c=[{i:-1,j:0},{i:1,j:0},{i:0,j:1},{i:0,j:-1}];for(let n=0;n<c.length;n++)for(let s=1;s<=8;s++){const r=s*c[n].i,l=s*c[n].j,a={i:e.i+r,j:e.j+l};if(a.i>7||a.i<0||a.j>7||a.j<0)break;if(!T(i,a)){const e=i[a.i][a.j];B(e)?B(e)&&P(e)&&t.push(a):t.push(a);break}t.push(a)}return t}function l(e,i,l=!1){var a;let o=!1,g=i.isBlackTurn?i.kingPos.black:i.kingPos.white;const u=n(g,e),j=s(g,e,!0),B=function(e,i){let t=[];const{isBlackTurn:c}=d,n=d.isBlackTurn?i.kingPos.black:i.kingPos.white,s=[{i:c?n.i+1:n.i-1,j:n.j+1},{i:n.i-1,j:c?n.j+1:n.j-1}];for(let e=0;e<s.length;e++)s[e].i>=0&&s[e].i<8&&s[e].j>=0&&s[e].j<8&&t.push(s[e]);return t}(0,i),P=c(g,e),T=r(g,e);return!o&&j.forEach((c=>{const n=e[c.i][c.j],s=i.isBlackTurn?i.gPieces.QUEEN_WHITE:i.gPieces.QUEEN_BLACK;n&&n===s&&(o=!0,!l&&t(g))})),!o&&u.forEach((c=>{const n=e[c.i][c.j],s=i.isBlackTurn?i.gPieces.KNIGHT_WHITE:i.gPieces.KNIGHT_BLACK;n&&n===s&&(o=!0,!l&&t(g))})),!o&&B.forEach((c=>{const n=e[c.i][c.j],s=i.isBlackTurn?i.gPieces.PAWN_WHITE:i.gPieces.PAWN_BLACK;n&&n===s&&(o=!0,!l&&t(g))})),!o&&P.forEach((c=>{const n=e[c.i][c.j],s=i.isBlackTurn?i.gPieces.BISHOP_WHITE:i.gPieces.BISHOP_BLACK;n&&n===s&&(o=!0,!l&&t(g))})),!o&&T.forEach((c=>{const n=e[c.i][c.j],s=i.isBlackTurn?i.gPieces.ROOK_WHITE:i.gPieces.ROOK_BLACK;n&&n===s&&(o=!0,!l&&t(g))})),o?(l||(i.isBlackTurn?i.isBlackKingThreatened=!0:i.isWhiteKingThreatened=!0),!0):(l||(i.isBlackTurn?i.isBlackKingThreatened=!1:i.isWhiteKingThreatened=!1,null===(a=document.querySelector(".red"))||void 0===a||a.classList.remove("red")),!1)}function a(e){if(e.target instanceof Element){const t=j(e.target.id),l=d.gBoard[t.i][t.j],a=e.target.classList.contains("selected"),K=e.target.classList.contains("mark"),f=e.target.classList.contains("castling");if(e.target.classList.contains("eatable")&&d.gSelectedElCell){if(!E(d.gSelectedElCell,e.target))return;return o(d.gSelectedElCell,e.target),void i()}if(f&&d.gSelectedElCell)return function(e,i){const t=j(e.id),c=j(i.id);let n="",s=null;if(d.gBoard[c.i][c.j]===d.gPieces.KING_WHITE&&d.isCastlingLegal.white){const r=d.gBoard[t.i][t.j];n=d.gBoard[c.i][c.j],d.gBoard[t.i][t.j]="",d.gBoard[c.i][c.j]="",0===t.j?(d.gBoard[7][3]=r,d.gBoard[7][2]=n,s={i:7,j:2},e.innerText="",i.innerText="",document.querySelector("#cell-7-3").innerText=r,document.querySelector("#cell-7-2").innerText=n,u()):7===t.j&&(d.gBoard[7][5]=r,d.gBoard[7][6]=n,s={i:7,j:6},e.innerText="",i.innerText="",document.querySelector("#cell-7-5").innerText=r,document.querySelector("#cell-7-6").innerText=n,u())}if(d.gBoard[c.i][c.j]===d.gPieces.KING_BLACK&&d.isCastlingLegal.black){const r=d.gBoard[t.i][t.j];n=d.gBoard[c.i][c.j],d.gBoard[t.i][t.j]="",d.gBoard[c.i][c.j]="",0===t.j?(d.gBoard[0][3]=r,d.gBoard[0][2]=n,s={i:0,j:2},e.innerText="",i.innerText="",document.querySelector("#cell-0-3").innerText=r,document.querySelector("#cell-0-2").innerText=n,u()):7===t.j&&(d.gBoard[0][5]=r,d.gBoard[0][6]=n,s={i:0,j:6},e.innerText="",i.innerText="",document.querySelector("#cell-0-5").innerText=r,document.querySelector("#cell-0-6").innerText=n,u())}s&&g(s,n)}(d.gSelectedElCell,e.target),void i();if(!B(l)&&""!==l)return;if(a)return e.target.classList.remove("selected"),d.gSelectedElCell=null,void i();if(K&&d.gSelectedElCell){if(!E(d.gSelectedElCell,e.target))return;return o(d.gSelectedElCell,e.target),void i()}i(),e.target.classList.add("selected"),d.gSelectedElCell=e.target;let I=function(e,i){let t=[];switch(e){case d.gPieces.KING_WHITE:case d.gPieces.KING_BLACK:t=function(e,i){let t=[];const c=[{i:-1,j:0},{i:0,j:1},{i:-1,j:1},{i:-1,j:-1},{i:0,j:-1},{i:1,j:0},{i:1,j:-1},{i:1,j:1}];for(let n=0;n<c.length;n++){const s=c[n].i,r=c[n].j,l={i:i.i+s,j:i.j+r};if(l.i>=0&&l.i<8&&l.j>=0&&l.j<8)if(T(e,l))t.push(l);else{const i=e[l.i][l.j];B(i)?B(i)&&P(i)&&t.push(l):t.push(l)}}return t}(d.gBoard,i);break;case d.gPieces.QUEEN_WHITE:case d.gPieces.QUEEN_BLACK:t=s(i,d.gBoard);break;case d.gPieces.ROOK_BLACK:case d.gPieces.ROOK_WHITE:t=r(i,d.gBoard);break;case d.gPieces.BISHOP_BLACK:case d.gPieces.BISHOP_WHITE:t=c(i,d.gBoard);break;case d.gPieces.KNIGHT_BLACK:case d.gPieces.KNIGHT_WHITE:t=n(i,d.gBoard);break;case d.gPieces.PAWN_BLACK:case d.gPieces.PAWN_WHITE:t=function(e,i,t){let c=[],n=i?-1:1,s={i:e.i+n,j:e.j};return T(t,s)&&c.push(s),(1===e.i&&!i||6===e.i&&i)&&(n*=2,s={i:e.i+n,j:e.j},T(t,s)&&c.push(s)),i?(s={i:e.i-1,j:e.j-1},t[s.i][s.j]&&!B(t[s.i][s.j])&&c.push(s),s={i:e.i-1,j:e.j+1},t[s.i][s.j]&&!B(t[s.i][s.j])&&c.push(s)):i||(s={i:e.i+1,j:e.j+1},t[s.i][s.j]&&!B(t[s.i][s.j])&&c.push(s),s={i:e.i+1,j:e.j-1},t[s.i][s.j]&&!B(t[s.i][s.j])&&c.push(s)),c}(i,e===d.gPieces.PAWN_WHITE,d.gBoard)}return t}(l,t);!function(e){for(let i=0;i<e.length;i++){const t=e[i];let c=document.querySelector(`#cell-${t.i}-${t.j}`);if(!c)return;B(d.gBoard[t.i][t.j])?c.classList.add("castling"):d.gBoard[t.i][t.j]?c.classList.add("eatable"):(c.innerHTML='<span class="span"></span>',c.classList.add("mark"))}}(I)}}function o(e,i){const t=j(e.id),c=j(i.id),n="♔"===d.gBoard[t.i][t.j]||"♚"===d.gBoard[t.i][t.j];if(d.gBoard[c.i][c.j]){const e=d.gBoard[c.i][c.j];!0===K(e)?(d.eatenPieces.white.push(e),document.querySelector(".eaten-pieces-white").innerHTML+=`<span>${e}</span>`):!1===K(e)&&(d.eatenPieces.black.push(e),document.querySelector(".eaten-pieces-black").innerHTML+=`<span>${e}</span>`)}const s=d.gBoard[t.i][t.j];d.gBoard[t.i][t.j]="",d.gBoard[c.i][c.j]=s,e.innerText="",i.innerText=s,u(),n&&g(c,s),l(d.gBoard,d)}function g(e,i){console.log("updateKingPos()",e,i),"♔"===i&&(d.kingPos.white={i:e.i,j:e.j}),"♚"===i&&(d.kingPos.black={i:e.i,j:e.j})}function u(){var e,i,t,c;d.isBlackTurn=!d.isBlackTurn,d.isBlackTurn?(null===(e=document.querySelector(".turn-white"))||void 0===e||e.classList.remove("playing"),null===(i=document.querySelector(".turn-black"))||void 0===i||i.classList.add("playing")):(null===(t=document.querySelector(".turn-black"))||void 0===t||t.classList.remove("playing"),null===(c=document.querySelector(".turn-white"))||void 0===c||c.classList.add("playing"))}function j(e){const i=e.split("-");return{i:+i[1],j:+i[2]}}e.d({},{Yt:()=>d,vy:()=>K,Eb:()=>B,Dc:()=>T,zm:()=>E,an:()=>P});const d={isOn:!1,isBlackTurn:!1,gBoard:[],gSelectedElCell:null,isWhiteKingThreatened:!1,isBlackKingThreatened:!1,isCastlingLegal:{white:!0,black:!0},kingPos:{black:{i:0,j:4},white:{i:7,j:4}},eatenPieces:{black:[],white:[]},gPieces:{KING_WHITE:"♔",KING_BLACK:"♚",BISHOP_WHITE:"♗",BISHOP_BLACK:"♝",PAWN_WHITE:"♙",PAWN_BLACK:"♟",QUEEN_WHITE:"♕",QUEEN_BLACK:"♛",ROOK_WHITE:"♖",ROOK_BLACK:"♜",KNIGHT_WHITE:"♘",KNIGHT_BLACK:"♞"}};function B(e){return d.isBlackTurn===K(e)}function P(e){if(!d.gSelectedElCell)return;const i=j(d.gSelectedElCell.id),t=d.gBoard[i.i][i.j];return e===d.gPieces.KING_WHITE&&t===d.gPieces.ROOK_WHITE||e===d.gPieces.ROOK_WHITE&&t===d.gPieces.KING_WHITE||e===d.gPieces.KING_BLACK&&t===d.gPieces.ROOK_BLACK||e===d.gPieces.ROOK_BLACK&&t===d.gPieces.KING_BLACK}function T(e,i){return""===e[i.i][i.j]}function K(e){switch(e){case d.gPieces.KING_WHITE:case d.gPieces.BISHOP_WHITE:case d.gPieces.PAWN_WHITE:case d.gPieces.QUEEN_WHITE:case d.gPieces.ROOK_WHITE:case d.gPieces.KNIGHT_WHITE:return!1;case d.gPieces.KING_BLACK:case d.gPieces.BISHOP_BLACK:case d.gPieces.PAWN_BLACK:case d.gPieces.QUEEN_BLACK:case d.gPieces.ROOK_BLACK:case d.gPieces.KNIGHT_BLACK:return!0;default:return}}function E(e,i){const t=j(e.id),c=j(i.id),n=JSON.parse(JSON.stringify(d)),s="♔"===n.gBoard[t.i][t.j]||"♚"===n.gBoard[t.i][t.j],r=n.gBoard[t.i][t.j];return n.gBoard[t.i][t.j]="",n.gBoard[c.i][c.j]=r,s&&("♔"===r&&(n.kingPos.white={i:c.i,j:c.j},d.isCastlingLegal.white=!1),"♚"===r&&(n.kingPos.black={i:c.i,j:c.j},d.isCastlingLegal.black=!1)),!l(n.gBoard,n,!0)}window.onload=function(){d.gBoard=function(){const e=[];for(let i=0;i<8;i++){e[i]=[];for(let t=0;t<8;t++){let c="";1===i&&(c=d.gPieces.PAWN_BLACK),6===i&&(c=d.gPieces.PAWN_WHITE),e[i][t]=c}}return e[0][0]=e[0][7]=d.gPieces.ROOK_BLACK,e[0][1]=e[0][6]=d.gPieces.KNIGHT_BLACK,e[0][2]=e[0][5]=d.gPieces.BISHOP_BLACK,e[0][3]=d.gPieces.QUEEN_BLACK,e[0][4]=d.gPieces.KING_BLACK,e[7][0]=e[7][7]=d.gPieces.ROOK_WHITE,e[7][1]=e[7][6]=d.gPieces.KNIGHT_WHITE,e[7][2]=e[7][5]=d.gPieces.BISHOP_WHITE,e[7][3]=d.gPieces.QUEEN_WHITE,e[7][4]=d.gPieces.KING_WHITE,e}(),function(e){let i="";for(let t=0;t<e.length;t++){const c=e[t];i+="<tr>";for(let e=0;e<c.length;e++)i+=`<td id="cell-${t}-${e}" data-i="${t}" data-j="${e}" class="${(t+e)%2==0?"white":"black"} td" >\n                      ${c[e]}\n                    </td>`;i+="</tr>"}const t=document.querySelector("table");t&&(t.innerHTML=i)}(d.gBoard),d.isOn=!0,document.querySelectorAll(".td").forEach((e=>e.addEventListener("click",a)))}})();