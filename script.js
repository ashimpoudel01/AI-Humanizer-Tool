// Plain JS frontend to call /api/humanize
const input = document.getElementById('inputText');
const output = document.getElementById('outputText');
const humanizeBtn = document.getElementById('humanizeBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const wordcount = document.getElementById('wordcount');
const readabilityEl = document.getElementById('readability');
const outWords = document.getElementById('outWords');
const explanationEl = document.getElementById('explanation');
const analysis = document.getElementById('analysis');
const warning = document.getElementById('warning');

let backendAvailable = true;

function countWords(text){
  return text.trim().split(/\s+/).filter(Boolean).length;
}

input.addEventListener('input', ()=>{
  wordcount.textContent = `${countWords(input.value)} words`;
});

copyBtn.addEventListener('click', async ()=>{
  await navigator.clipboard.writeText(output.value);
  alert('Copied to clipboard');
});

downloadBtn.addEventListener('click', ()=>{
  const blob = new Blob([output.value], {type:'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'humanized.txt';
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

humanizeBtn.addEventListener('click', async ()=>{
  if(!input.value.trim()){
    alert('Please enter some text to humanize.');
    return;
  }
  humanizeBtn.disabled = true; humanizeBtn.textContent = 'Humanizing...';
  try{
    const res = await fetch('/api/humanize', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({text: input.value})
    });
    if(!res.ok){
      const err = await res.text();
      throw new Error(err||res.statusText);
    }
    const data = await res.json();
    output.value = data.humanizedText || '';
    const score = data.aiScore ?? 0;
    readabilityEl.textContent = (data.readabilityScore ?? '—');
    outWords.textContent = (data.wordCount ?? countWords(output.value));
    explanationEl.textContent = data.explanation || '';
    analysis.classList.remove('hidden');
    copyBtn.disabled = !output.value;
    downloadBtn.disabled = !output.value;
    
    // Update gauge
    updateGauge(score);

    // Honesty banner when AI-assisted
    const honesty = document.getElementById('honesty');
    if (data.ai_assisted) {
      honesty.textContent = `Note: This rewrite used an AI model (${data.modelUsed}). It may help improve quality but should be cited if used in submissions.`;
      honesty.classList.remove('hidden');
    } else {
      honesty.classList.add('hidden');
    }

    // Compute visual diff with color highlighting
    const visualDiffEl = document.getElementById('visualDiff');
    visualDiffEl.innerHTML = computeVisualDiff(input.value, output.value);
  }catch(err){
    console.error(err);
    alert('Error: '+err.message);
  }finally{
    humanizeBtn.disabled = false; humanizeBtn.textContent = 'Humanize Text';
  }
});

// Health check for backend
(async function(){
  try{
    const res = await fetch('/api/health');
    if(!res.ok) throw new Error('No backend');
    const r = await res.json();
    if(!r.ok) throw new Error('backend unhealthy');
    warning.classList.add('hidden');
    backendAvailable = true;
    humanizeBtn.disabled = false;
  }catch(e){
    backendAvailable = false;
    warning.textContent = 'Backend not available — the humanize API is offline. You can still paste and copy text, but the Humanize feature is disabled.';
    warning.classList.remove('hidden');
    humanizeBtn.disabled = true;
  }
})();

// Visual diff like QuillBot - shows original text with highlighted changes
function computeVisualDiff(original, humanized) {
  const origWords = original.split(/\s+/);
  const humanWords = humanized.split(/\s+/);
  
  // Build word-level diff using dynamic programming
  const n = origWords.length;
  const m = humanWords.length;
  const dp = Array.from({length: n+1}, () => Array(m+1).fill(0));
  
  for (let i = n-1; i >= 0; i--) {
    for (let j = m-1; j >= 0; j--) {
      if (origWords[i].toLowerCase() === humanWords[j].toLowerCase()) {
        dp[i][j] = 1 + dp[i+1][j+1];
      } else {
        dp[i][j] = Math.max(dp[i+1][j], dp[i][j+1]);
      }
    }
  }
  
  // Backtrack to find the diff
  let i = 0, j = 0;
  const result = [];
  
  while (i < n || j < m) {
    if (i < n && j < m && origWords[i].toLowerCase() === humanWords[j].toLowerCase()) {
      // Unchanged word
      result.push(escapeHtml(humanWords[j]));
      i++;
      j++;
    } else if (i < n && (j >= m || dp[i+1][j] >= dp[i][j+1])) {
      // Word was removed/changed
      if (j < m && dp[i][j+1] > dp[i+1][j]) {
        // Replacement - show as changed word
        result.push(`<span style="background:#ff4757;color:white;padding:2px 6px;border-radius:4px;font-weight:500">${escapeHtml(humanWords[j])}</span>`);
        i++;
        j++;
      } else {
        i++;
      }
    } else {
      // Word was added
      const isStructural = /^(really|actually|basically|honestly|pretty|quite|very|like|just|so|well|now)$/i.test(humanWords[j]);
      const color = isStructural ? '#ffa502' : '#1e90ff';
      result.push(`<span style="background:${color};color:white;padding:2px 6px;border-radius:4px;font-weight:500">${escapeHtml(humanWords[j])}</span>`);
      j++;
    }
  }
  
  return result.join(' ');
}

function escapeHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Update the AI Score Gauge
function updateGauge(score) {
  const gaugeNeedle = document.getElementById('gaugeNeedle');
  const gaugeScore = document.getElementById('gaugeScore');
  const gaugeStatus = document.getElementById('gaugeStatus');
  
  // Clamp score between 0 and 10
  score = Math.max(0, Math.min(10, score));
  
  // Update score display
  gaugeScore.textContent = score;
  
  // Calculate needle rotation (-90deg to 90deg, where -90 is 0 score and 90 is 10 score)
  const rotation = -90 + (score * 18); // 180 degrees total / 10 = 18 degrees per point
  gaugeNeedle.style.transform = `rotate(${rotation}deg)`;
  
  // Update status text and color (score is 0-10, representing 0-100%)
  let statusText = '';
  let statusClass = '';
  
  if (score <= 2) {
    statusText = `Excellent - ${score * 10}% AI Detection`;
    statusClass = 'excellent';
  } else if (score <= 4) {
    statusText = `Good - ${score * 10}% AI Detection`;
    statusClass = 'good';
  } else if (score <= 6) {
    statusText = `Warning - ${score * 10}% AI Detection`;
    statusClass = 'warning';
  } else {
    statusText = `Danger - ${score * 10}% AI Detection`;
    statusClass = 'danger';
  }
  
  gaugeStatus.textContent = statusText;
  gaugeStatus.className = 'gauge-status ' + statusClass;
}