# 🤖 AI Text Humanizer

<div align="center">

![Python](https://img.shields.io/badge/Python-3.7%2B-blue)
![Flask](https://img.shields.io/badge/Flask-3.0.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Active-success)

**Transform AI-generated text into natural, human-like content with visual diff highlighting and accurate AI detection scoring.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation)

</div>

---

## 🌟 Features

### 🎨 **Visual Diff Highlighting** (QuillBot-style)
- 🔴 **Red**: Changed words
- 🟠 **Orange**: Structural additions (really, actually, etc.)
- 🔵 **Blue**: New additions
- See exactly what changed at a glance!

### 📊 **Animated AI Score Gauge**
- Real-time AI detection percentage (0-100%)
- Color-coded risk levels: Green (0-30%), Yellow (40-60%), Red (70-100%)
- Smooth needle animation with status indicators

### 🧠 **Advanced AI Detection Algorithm**
Analyzes 11 key factors:
- **Perplexity** - Sentence length consistency
- **Burstiness** - Paragraph flow patterns
- **Contractions** - Natural language usage
- **AI Red Flags** - Formal phrases detection
- **Sentence Starters** - Beginning variety
- **Human Imperfections** - Typos, spacing errors
- **Casual Language** - Conversational markers
- **Punctuation Variety** - Ellipsis, em dashes, etc.
- **Word Repetition** - Diversity analysis
- And more...

### ⚡ **Smart Humanization**
- **Length-Aware Processing**: Adjusts intensity for short/long/very-long texts
- **50-65% Synonym Replacement**: Natural vocabulary variation
- **70-80% Contractions**: "it's", "don't", "can't"
- **35-45% Casual Language**: "really", "pretty", "actually"
- **25-35% Filler Words**: "basically", "honestly"
- **Pattern Breaking**: Removes AI indicators like "Overall," "In conclusion"

---

## 🎬 Demo

### Input (AI-Generated):
```
Overall, the article demonstrates that cows are important animals. 
They are herbivores, which means they eat plants like grass.
```

### Output (Humanized):
```
People really need cows because they are big, gentle animals. 
They're actually herbivores, which means they only eat plants like grass.
But since they are ruminants, they have four stomach chambers...
```

**AI Detection Score**: 2/10 (20%) ✅

---

## 🚀 Installation

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/ashimpoudel01/AI-Humanizer-Tool.git
cd AI-Humanizer-Tool
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Run the server**
```bash
python server.py
```

4. **Open your browser**
```
http://localhost:3000
```

That's it! 🎉

---

## 💻 Usage

### Web Interface

1. **Paste your AI-generated text** into the input box
2. **Click "Humanize Text"** 
3. **View results**:
   - Humanized output with visual diff
   - AI detection score gauge
   - Readability metrics
   - Word count statistics

### Features on the Interface
- ✅ Copy to clipboard
- ✅ Download as .txt file
- ✅ Real-time word count
- ✅ Visual change highlighting
- ✅ Detailed analysis section

---

## 📡 API Documentation

### Endpoint: `/api/humanize`

**Method:** `POST`

**Request Body:**
```json
{
  "text": "Your AI-generated text here"
}
```

**Response:**
```json
{
  "humanizedText": "Transformed text with natural variations",
  "aiScore": 3,
  "explanation": "Smart humanization (125 words, long): 60% word variation, sentence length variation. AI Detection: 3/10 (30% likely AI-generated).",
  "wordCount": 125,
  "readabilityScore": 68.4,
  "modelUsed": "python-smart-long",
  "ai_assisted": false
}
```

**Fields Explained:**
- `aiScore`: 0-10 scale (0 = 100% human, 10 = 100% AI)
- `readabilityScore`: Flesch Reading Ease score
- `modelUsed`: Processing tier (short/long/very-long)

### Example cURL Request:
```bash
curl -X POST http://localhost:3000/api/humanize \
  -H "Content-Type: application/json" \
  -d '{"text": "Your AI text here"}'
```

---

## 📁 Project Structure

```
AI-Humanizer-Tool/
├── server.py           # Flask backend with humanization engine
├── index.html          # Web interface
├── script.js           # Frontend logic & visual diff
├── styles.css          # Modern dark theme UI
├── requirements.txt    # Python dependencies
└── README.md          # Documentation
```

---

## 🧪 How It Works

### Processing Pipeline

1. **Text Analysis** → Detects length and complexity
2. **Synonym Replacement** → Natural vocabulary variations
3. **Contraction Injection** → Adds "don't", "it's", etc.
4. **Casual Language** → Inserts "really", "actually"
5. **Pattern Breaking** → Removes AI red flags
6. **Imperfection Addition** → Strategic typos on safe words
7. **AI Detection** → Analyzes humanized output
8. **Visual Diff** → Color-codes all changes

### Length-Based Tiers

| Text Length | Synonym Rate | Contractions | Casual Words | Processing |
|------------|-------------|--------------|--------------|------------|
| **Short** (<100 words) | 50% | 70% | 35% | Balanced |
| **Long** (100-300 words) | 60% | 75% | 40% | + Restructuring |
| **Very Long** (300+ words) | 65% | 80% | 45% | + Paragraphs |

---

## 🛡️ AI Detection Accuracy

Our algorithm analyzes **11 weighted factors** to calculate AI likelihood:

### Critical Factors (High Weight):
- ✅ **Perplexity Analysis** (Coefficient of Variation)
- ✅ **Burstiness Detection** (Consecutive sentence patterns)
- ✅ **AI Red Flags** ("Overall," "In conclusion," etc.)
- ✅ **Contraction Density** (Natural usage patterns)

### Important Factors (Medium Weight):
- ✅ Sentence starter variety
- ✅ Transition word frequency
- ✅ Human imperfections (typos, spacing)
- ✅ Casual language markers
- ✅ Punctuation diversity
- ✅ Word repetition analysis
- ✅ Exclamation usage

**Result:** Highly accurate AI detection matching real detectors like GPTZero, Originality.ai

---

## 🎯 Use Cases

- ✍️ **Content Writing**: Make AI drafts sound more natural
- 📝 **Academic Writing**: Add human touch to research papers
- 💼 **Business Communications**: Humanize automated emails
- 📱 **Social Media**: Create authentic-sounding posts
- 🎓 **Education**: Learn about AI detection patterns

> ⚠️ **Note**: Always review and edit the output. This tool is for improving writing quality, not for academic dishonesty.

---

## 🔧 Configuration

### Adjust Humanization Intensity

Edit `server.py` lines 283-301 to customize rates:

```python
synonym_rate = 0.60      # 60% word variation
contraction_rate = 0.75  # 75% contractions
casual_rate = 0.40       # 40% casual words
```

### Add Custom Synonyms

Expand the synonym dictionary in `server.py` lines 323-365:

```python
synonyms = {
    'important': ['crucial', 'key', 'vital'],
    'your_word': ['synonym1', 'synonym2']
}
```

---

## 🐛 Troubleshooting

**Server won't start?**
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Use a different port
python server.py --port 5000
```

**Module not found?**
```bash
pip install --upgrade -r requirements.txt
```

**Diff not showing?**
- Clear browser cache (Ctrl + Shift + R)
- Check browser console for errors (F12)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by QuillBot's visual diff interface
- AI detection research from GPTZero and Originality.ai
- Flask web framework
- Natural Language Processing techniques

---

## 📧 Contact

**Ashim Poudel**
- GitHub: [@ashimpoudel01](https://github.com/ashimpoudel01)
- Repository: [AI-Humanizer-Tool](https://github.com/ashimpoudel01/AI-Humanizer-Tool)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ by [Ashim Poudel](https://github.com/ashimpoudel01)

</div>
