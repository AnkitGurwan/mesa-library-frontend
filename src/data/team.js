const team = [
    {
        id:1,
        name:"Poorva Upaman",
        image:"https://firebasestorage.googleapis.com/v0/b/mesa-library.appspot.com/o/uploads%2F12345%2F8ad6fd6a-9a1f-4743-9b70-85bf97c1840e.png?alt=media&token=de5027e2-e9e5-4b5f-b9d0-1ce7834ee378",
        background: "#febc01",
        position:"President",
        socialMedia: {instagram:'https://www.instagram.com/poorva.18/',linkedin: 'https://www.linkedin.com/in/poorva-upman?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',mail: 'mailto:poorvaupman1@gmail.com'},
    },
    {
        id:2,
        name:"Amit Rathore",
        image:"https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc",
        background: "#5ebec4",
        position:"Vice-President",
        socialMedia: {instagram:'https://www.instagram.com/ig_amitrathore/',linkedin: 'https://www.linkedin.com/in/amit-rathore-7ba1a1259/',mail: 'mailto:rathoream999@gmail.com'},
    },
    {
        id:3,
        name:"Jatin Varma",
        image:"https://firebasestorage.googleapis.com/v0/b/mesa-8924d.appspot.com/o/phototo.png?alt=media&token=098d7411-a0c3-48f1-8b11-518ab50e987f",
        background: "#bcfd4c",
        position:"Web Head",
        socialMedia: {instagram:'https://www.instagram.com/varmajatin2004/', linkedin:'https://www.linkedin.com/in/varmajatin/',mail: 'mailto:s.varma@iitg.ac.in' },
    },
    {
        id:4,
        name:"Mehak",
        image:"https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc",
        background: "#d6a3fb",
        position:"PR and Alumni Head",
        socialMedia: {instagram:'https://www.instagram.com/_mehak86/',linkedin:'https://www.linkedin.com/in/mehak-96474426b/',mail:'mailto:m.mehak@iitg.ac.in'},
    },
    {
        id:5,
        name:"Tanya Gupta",
        image:"https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc",
        background: "#f92c85",
        position:"Core Team",
        socialMedia: {instagram:'https://www.instagram.com/tanyagupta835/',linkedin: 'https://www.linkedin.com/in/tanya-gupta-611066278/',mail: 'mailto:g.tanya@gmail.com'},
    },

    {
        id:6,
        name:"Rohan Sharma",
        image:"https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc",
        background: "orange",
        position:"Core Team",
        socialMedia: {instagram:'https://www.instagram.com/rohan_shr135/',linkedin: 'https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAADcNq1wBkKq6N0JRlFxj18fbxXZw2GV_ymw&keywords=rohan%20sharma&origin=RICH_QUERY_SUGGESTION&position=1&searchId=00f64d4d-3b19-457e-922a-a1f046d1b86d&sid=u1W&spellCorrectionEnabled=false',mail: 'mailto:rohan.mech22@iitg.ac.in'},
    },

    {
        id:7,
        name:"Kabang",
        image:"https://firebasestorage.googleapis.com/v0/b/mesa-8924d.appspot.com/o/Kabang.png?alt=media&token=82aa58d1-d56d-4c13-a785-353743531cd6",
        background: "gray",
        position:"Creatives Head",
        socialMedia: {instagram:'https://www.instagram.com/kabang_2002/', mail: 'mailto:c.kabang@iitg.ac.in' },
    },
    {
        id:8,
        name:"Akshar Chauhan",
        image:"https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc",
        background: "green",
        position:"Finance and Publication Head",
        socialMedia: {instagram:'https://www.instagram.com/akshxr_1754/', linkedin:'https://www.linkedin.com/in/akshar-chauhan-1a4128263/', mail: 'mailto:c.akshar@iitg.ac.in' },
    },

    {
        id:9,
        name:"Shreyansh Srivastava",
        image:"https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc",
        background: "#00efbf",
        position:"Core Team",
        socialMedia: {instagram:'https://www.instagram.com/shreyynshhh/',linkedin: 'https://www.linkedin.com/in/tanya-gupta-611066278/',mail: 'mailto:shreyansh.s@gmail.com'},
    },

    {
        id:10,
        name:"Ashok Menon",
        image:"https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc",
        background: "#BEB068",
        position:"Events Head",
        socialMedia: {instagram:'https://www.instagram.com/_ashoxx_.m083/',linkedin:'https://www.linkedin.com/in/ashok-menon-551199261/',mail:'mailto:ashok.menon@iitg.ac.in'},
    }

]
export default team;
