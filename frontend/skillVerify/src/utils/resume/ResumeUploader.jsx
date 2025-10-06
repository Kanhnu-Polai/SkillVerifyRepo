import React, { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Button,
  Chip,
  Typography,
  Box,
  Stack,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function DynamicResumeUploader({ onClose }) {
  const { userData } = useSelector((state) => state.userData);

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const change = (e) => {
    setFile(e.target.files[0] || null);
    setStatus("");
    setProgress(0);
  };

  const upload = async () => {
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("email", userData.email);

    try {
      setLoading(true);
      setStatus("");

      const xhr = new XMLHttpRequest();

      xhr.open("POST", "http://localhost:8083/api/users/upload/resume");

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        setLoading(false);
        if (xhr.status >= 200 && xhr.status < 300) {
          setStatus("success");
          setFile(null);
          setProgress(0);
          // onClose?.(); // Uncomment to auto-close
        } else {
          console.error(xhr.responseText);
          setStatus("error");
        }
      };

      xhr.onerror = () => {
        setLoading(false);
        setStatus("error");
      };

      xhr.send(fd);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setStatus("error");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "white",
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" textAlign="center">
          Upload Résumé
        </Typography>

        {/* File Picker */}
        <label
          htmlFor="resume-upload"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 cursor-pointer transition"
        >
          <UploadFileIcon />
          <span>Select Resume</span>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={change}
            className="hidden"
          />
        </label>

        {file && (
          <>
            <Chip
              label={file.name}
              size="medium"
              sx={{
                backgroundColor: "#FFF8E1",
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />
            {loading && (
              <>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ height: 8, borderRadius: 5 }}
                />
                <Typography align="center" fontSize={14} color="gray">
                  {progress}%
                </Typography>
              </>
            )}
          </>
        )}

        {/* Upload Button */}
        <Button
          variant="contained"
          fullWidth
          disabled={!file || loading}
          onClick={upload}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <UploadFileIcon />}
          sx={{
            backgroundColor: "#1976d2",
            ":hover": {
              backgroundColor: "#115293",
            },
          }}
        >
          {loading ? "Uploading…" : "Upload"}
        </Button>

        {/* Status Message */}
        {status === "success" && (
          <Typography color="green" align="center">
            ✅ Upload successful
          </Typography>
        )}
        {status === "error" && (
          <Typography color="error" align="center">
            ❌ Upload failed. Try again.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
