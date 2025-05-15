# RiseUp AI

**RiseUp AI** is an AI-powered support tool designed to assist individuals at risk of homelessness. It provides critical resources such as nearby shelters, food banks, and free healthcare services, while also helping users build a path toward long-term stability through personalized career roadmaps and local job opportunities.

## 🌟 Purpose

The mission of RiseUp AI is to support vulnerable populations by combining open city data with AI-driven guidance. Whether someone needs immediate aid or a plan to regain financial independence, RiseUp AI is there to help — anonymously, respectfully, and effectively.

## 🧠 What It Does

- 📍 **Resource Locator**: Finds nearby emergency shelters, food banks, and free healthcare services using city-level open data.
- 📝 **Dynamic Survey**: Collects user inputs on current situation, skills, and interests via an adaptive questionnaire.
- 💼 **Career Roadmapping**: Uses AI to generate a personalized, step-by-step career plan tailored to the user’s goals and needs.
- 📌 **Local Job Matching**: Surfaces relevant, active job opportunities in the user’s city based on roadmap recommendations.

## 🔧 How It Works

1. User completes an anonymous survey (no account required).
2. System pulls from city open data to locate nearby support services.
3. Based on skills and interests, a career roadmap is generated.
4. The app fetches real-time job listings that align with the roadmap and location.

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python, Flask
- **AI Integration**: OpenAI API (for roadmap generation)
- **Data Sources**: City-level open datasets (GeoJSON, CSV APIs, etc.)
- **Job Listings**: Public job boards (via scraping or public APIs)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/riseup-ai.git
cd riseup-ai
