import { Box, Button, Typography } from "@mui/material";
import { ResponsiveAppBar } from "../../components/appBar";
import CustomizedTables from "../../components/table";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { accountsPayable } from "../../services/apiAccountsPayableService";
import type { AccountsPayableDTO } from "../../types/accountsPayableDTO";
import backgroundDefault from "../../assets/background/backgroundDefault.jpg";


interface AccountsPayableProps {
  toggleMode: () => void;
  mode: boolean;
}

export const AccountsPayable = ({ toggleMode, mode }: AccountsPayableProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [rows, setRows] = useState<AccountsPayableDTO[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input changed:", e.target.files);
    if (!e.target.files) return;

    const selected = Array.from(Array.from(e.target.files));
    setFiles(selected);

    try {
      const result = await accountsPayable(selected);
      console.log("API Response:", result);
      if (!result || result.length === 0) {
        console.error("No data returned from the API");
        return;
      }
      setRows(result);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  //   const handleSubmit = async() => {
  //     if (!files?.length) return;

  //     try {
  //       const result = await accountsPayable(files);
  //       setRows(result);
  //     } catch (error) {
  //       return console.error("Error uploading files:", error);
  //     }
  //   }

  const handleUpload = async () => {
    if (!files?.length) return;

    const form = new FormData();

    Array.from(files).forEach((file) => {
      form.append("files", file);
    });
  };

  return (
    <div style={{ padding: "10px", backgroundImage: `url(${backgroundDefault})`, backgroundSize: "cover", minHeight: "100vh" }}>
      <ResponsiveAppBar toggleMode={toggleMode} mode={mode} />
      <Typography align="center" variant="h5" margin={2}>
        Contas a Pagar
      </Typography>
      <CustomizedTables rows={rows} />
      <Box
        display={"flex"}
        flexDirection="row"
        position={"fixed"}
        bottom={0}
        left={0}
        right={0}
        justifyContent="space-around"
        alignItems="center"
        sx={{padding: "10px" }}
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
    </div>
  );
};
