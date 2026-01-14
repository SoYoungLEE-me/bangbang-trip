import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: "16px 24px 0" }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

interface SpotFilterModalProps {
  setContentTypeId: React.Dispatch<React.SetStateAction<string>>;
}

const SpotFilterModal = ({ setContentTypeId }: SpotFilterModalProps) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeContentTypeId = (id: string) => {
    setContentTypeId(id);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={(theme) => ({
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.action.active,
            },
            "& .MuiTab-root.Mui-selected": {
              color: theme.palette.action.active,
            },
          })}
        >
          <Tab label="지역별" {...a11yProps(0)} onClick={() => handleChangeContentTypeId("12")} />
          <Tab label="코스별" {...a11yProps(1)} onClick={() => handleChangeContentTypeId("25")} />
          <Tab label="내주변" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
};

export default SpotFilterModal;
