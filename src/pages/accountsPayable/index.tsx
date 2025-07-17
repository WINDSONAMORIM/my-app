import { Box, Button, Typography } from "@mui/material";
import { ResponsiveAppBar } from "../../components/appBar";
import CustomizedTables from "../../components/table";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import {
  accountsPayableService,
  accountsPayableServicePreview,
} from "../../services/apiAccountsPayableService";
import type { AccountsPayablePreviewDTO } from "../../types/accountsPayableDTO";
import backgroundDefault from "../../assets/background/backgroundDefault.jpg";
import type { UploadResponse } from "../../types/apiResponse";

interface AccountsPayableProps {
  toggleMode: () => void;
  mode: boolean;
}

type UploadStatus = "idle" | "loading" | "success" | "error";

export const AccountsPayable = ({ toggleMode, mode }: AccountsPayableProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [rows, setRows] = useState<AccountsPayablePreviewDTO[]>([]);
  const [, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadResults, setuploadResults] = useState<UploadResponse[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selected = Array.from(Array.from(e.target.files));
    setFiles(selected);

    try {
      const result = await accountsPayableServicePreview(selected);
      if (!result || result.length === 0) {
        console.error("No data returned from the API");
        return;
      }
      setRows(result);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleUpload = async () => {
    if (!files?.length) return;
    const result = await accountsPayableService(files);
    console.log("sucess na page:", result);

    if (result) {
      setuploadResults([result]);
      setUploadStatus(result.success ? "success" : "error");
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        backgroundImage: `url(${backgroundDefault})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <ResponsiveAppBar toggleMode={toggleMode} mode={mode} />
      <Typography align="center" variant="h5" margin={2}>
        Contas a Pagar
      </Typography>
      <Box
        display={"flex"}
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ padding: "10px" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            height: "50%",
          }}
        >
          <input
            type="file"
            id="file-upload"
            accept=".xml"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{
                width: "50%",
                height: "100%",
                margin: "20px auto",
                display: "flex",
              }}
              variant="contained"
            >
              Upload
            </Button>
          </label>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            height: "50%",
          }}
        >
          <Button
            onClick={handleUpload}
            variant="contained"
            color="primary"
            sx={{
              width: "50%",
              height: "100%",
              margin: "20px auto",
              display: "flex",
            }}
          >
            Enviar
          </Button>
        </Box>
      </Box>
      <CustomizedTables rows={rows} uploadResults={uploadResults} />
    </div>
  );
};
