import { useState } from 'react';
import { Upload, LoaderCircle, Mail, Sparkles } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import './App.css';

function App() {
  const [jdFile, setJdFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [matchScore, setMatchScore] = useState(null);
  const [emailContent, setEmailContent] = useState("");

  const handleMatch = async () => {
    if (!jdFile || !resumeFile) {
      alert("Please upload both JD and Resume files.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("jd_file", jdFile);
    formData.append("resume_file", resumeFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/match_and_email`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setMatchScore(data.match_score);
      setEmailContent(data.email_content);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 shadow-2xl rounded-2xl bg-white">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="text-yellow-500" /> Resume Matcher
        </h1>

        <div className="flex flex-col gap-4 mb-4">
          <input type="file" accept=".pdf,.docx" onChange={e => setJdFile(e.target.files[0])} />
          <input type="file" accept=".pdf,.docx" onChange={e => setResumeFile(e.target.files[0])} />
        </div>

        <Button className="w-full" onClick={handleMatch}>
          <Upload className="mr-2 h-4 w-4" /> Match Resume
        </Button>

        {loading && (
          <div className="mt-4 flex justify-center">
            <LoaderCircle className="animate-spin text-blue-500 h-6 w-6" />
          </div>
        )}

        {matchScore !== null && !loading && (
          <Card className="mt-6 bg-green-50 p-4 border border-green-200">
            <CardContent>
              <h2 className="text-xl font-semibold text-green-700">Match Score: {matchScore}%</h2>
            </CardContent>
          </Card>
        )}

        {emailContent && !loading && (
          <Card className="mt-4 bg-blue-50 p-4 border border-blue-200">
            <CardContent>
              <h2 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                <Mail /> Suggested Email
              </h2>
              <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
                {emailContent}
              </p>
            </CardContent>
          </Card>
        )}
      </Card>
    </div>
  );
}

export default App;
