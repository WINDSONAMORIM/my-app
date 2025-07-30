import { Box, Button, Typography } from "@mui/material";
import { ResponsiveAppBar } from "../../components/appBar";
import CustomizedTables from "../../components/table";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import {
  accountsPayableService,
  accountsPayableServicePreview,
} from "../../services/apiAccountsPayableService";
// import backgroundDefault from "../../assets/background/backgroundDefault.jpg";
import type { ApiResponse } from "../../types/apiResponse";
import type { AccountsPayablePreviewDTO } from "../../types/accountsPayableDTO";
import { type StatusIconProps } from "../../components/statusIcon";

interface AccountsPayableProps {
  toggleMode: () => void;
  mode: boolean;
}

export const AccountsPayable = ({ toggleMode, mode }: AccountsPayableProps) => {
  const [, setFiles] = useState<File[]>([]);
  const [rows, setRows] = useState<ApiResponse<AccountsPayablePreviewDTO>[]>(
    []
  );
  const [updateIcons, setUpdateIcons] = useState<StatusIconProps[]>([]);
  const [disableSend, setDisableSend] = useState<boolean>(true);

  useEffect(() => {}, [updateIcons]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selected = Array.from(Array.from(e.target.files));
    setFiles(selected);

    try {
      const result = await accountsPayableServicePreview(selected);
      if (!result) {
        console.error("No data returned from the API");
        return;
      }
      setDisableSend(result.some(status=> status.statusCode === 400))

      setRows(result);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleUpload = async () => {
    console.log("Clicked Send")
    // if (!files?.length) return;
    const result = await accountsPayableService();
    console.log("Result from accounts payable service:", result);

    const icons: StatusIconProps[] = result.data.map((r) => ({
      status: r.statusCode >= 400 ? "error" : "success",
      message: r.data || r.message,
    }));

    setUpdateIcons(icons);
  };

  return (
    <div
      style={{
        padding: "10px",
        backgroundImage: "linear-gradient(to top, #000428, #004e92)",
        // backgroundImage: `url(${backgroundDefault})`,
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
            disabled={disableSend}
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
      <CustomizedTables rows={rows} icons={updateIcons} />
    </div>
  );
};
