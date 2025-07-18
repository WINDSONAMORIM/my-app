import SyncIcon from "@mui/icons-material/Sync";
import SyncDisabledIcon from "@mui/icons-material/SyncDisabled";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Tooltip } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

export type UploadStatus = "idle" | "loading" | "success" | "error";

export interface StatusIconProps {
  status: UploadStatus;
  message: string;
}

const icon = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

const SpinningIcon = styled(SyncIcon)(() => ({
  animation: `${icon} 1s linear infinite`,
}));

export const StatusIcon: React.FC<StatusIconProps> = ({ status, message }) => {
  const getIcon = () => {
    switch (status) {
      case "loading":
        return <SpinningIcon color="primary" />;
      case "success":
        return <TaskAltIcon color="success" />;
      case "error":
        return <SyncDisabledIcon color="error" />;
      default:
        return <SyncIcon />;
    }
  };
  return <Tooltip title={message}>{getIcon()}</Tooltip>;
};
