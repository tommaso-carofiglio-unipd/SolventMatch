function getSolventFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function loadSolventData() {
    try {
        const response = await fetch('data/solvents.json');
        if (!response.ok) {
            throw new Error('Errore nel caricamento del file JSON');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Errore:', error);
        return null;
    }
}

function displaySolvent(solventData) {
    const card = document.getElementById('solvent-card');
    
    const html = `
        <div class="solvent-header" style="background-color: ${solventData.colore}">
            <h2>${solventData.nome}</h2>
            <p class="formula">${solventData.formula}</p>
        </div>
        
        <div class="solvent-body">
            <div class="info-row">
                <span class="label">Numero CAS:</span>
                <span class="value">${solventData.cas}</span>
            </div>
            
            <div class="info-row">
                <span class="label">Polarità:</span>
                <span class="value">${solventData.polarita}</span>
            </div>
            
            <div class="info-row">
                <span class="label">Punto di ebollizione:</span>
                <span class="value">${solventData.puntoDiEbollizione}</span>
            </div>
            
            <div class="info-row">
                <span class="label">Miscibilità con acqua:</span>
                <span class="value">${solventData.miscibilitaAcqua}</span>
            </div>
            
            <div class="info-row">
                <span class="label">Densità:</span>
                <span class="value">${solventData.densita}</span>
            </div>
            
            <div class="section">
                <h3>📌 Proprietà chiave</h3>
                <ul>
                    ${solventData.proprietaChiave.map(prop => `<li>${prop}</li>`).join('')}
                </ul>
            </div>
            
            <div class="section">
                <h3>🧪 Usi comuni</h3>
                <p>${solventData.usi}</p>
            </div>
            
            <div class="section safety">
                <h3>⚠️ Sicurezza</h3>
                <p>${solventData.sicurezza}</p>
            </div>
        </div>
    `;
    
    card.innerHTML = html;
}

async function init() {
    const solventId = getSolventFromURL();
    
    if (!solventId) {
        document.getElementById('solvent-card').innerHTML = 
            '<p class="error">❌ Nessun solvente specificato.<br><br>Scansiona un QR code per visualizzare le informazioni!</p>';
        return;
    }
    
    const solventsData = await loadSol
