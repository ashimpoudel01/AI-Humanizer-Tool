# AI Text Humanizer

A powerful Python-based text humanizer that makes AI-generated content undetectable by AI detectors.

## Features

- **Smart Length Detection**: Automatically adjusts humanization intensity based on text length
- **70% Synonym Replacement**: Extensive vocabulary variation
- **85% Contractions**: Natural "it's", "don't", "can't" usage
- **40% Casual Language**: "really", "pretty", "quite" intensifiers
- **30% Filler Words**: "basically", "actually", "honestly"
- **Pattern Breaking**: Removes AI red flags like "Overall, the article demonstrates"
- **Natural Typos**: Common typos on safe words (7% rate)
- **Spacing Errors**: Missing commas, double spaces (18% rate)
- **Guaranteed AI Score**: Always under 10/100

## Installation

1. **Install Python** (3.7 or higher)
2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

## Usage

1. **Start the server**:
```bash
python server.py
```

2. **Open your browser** to: http://localhost:3000

3. **Paste your AI-generated text** and click "Humanize Text"

## How It Works

The humanizer applies different levels of transformation based on text length:

- **Short (< 100 words)**: 55% variation, balanced approach
- **Long (100-300 words)**: 60% variation, sentence restructuring
- **Very Long (300+ words)**: 70% variation, paragraph breaks, transitions

## Files

- `server.py` - Python Flask backend with humanization algorithm
- `index.html` - Clean, modern web interface
- `styles.css` - Beautiful UI styling
- `script.js` - Frontend logic
- `requirements.txt` - Python dependencies

## API Endpoint

**POST** `/api/humanize`

**Request:**
```json
{
  "text": "Your AI-generated text here"
}
```

**Response:**
```json
{
  "humanizedText": "Transformed text",
  "aiScore": 5,
  "explanation": "Smart humanization details",
  "wordCount": 150,
  "readabilityScore": 65.2,
  "modelUsed": "python-smart-long",
  "ai_assisted": false
}
```

## License

MIT
