const NeueVeranstaltungsId = (veranstaltungen) => {
    const höchsteId = Math.max(...veranstaltungen.map(veranstaltung => parseInt(veranstaltung.id))) || 0;
    return höchsteId + 1;
 };
 
 module.exports = NeueVeranstaltungsId;
 

 // nimmt den Höchsten ID-Wert von veranstaltungen und macht id + 1