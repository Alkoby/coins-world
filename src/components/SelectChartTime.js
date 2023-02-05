import { makeStyles } from "@material-ui/core";

const SelectChartTime = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      textAlign:"center",
      border: "1px solid white",
      borderRadius: 5,
      padding: 5,
      paddingLeft: 5,
      paddingRight: 5,
      fontFamily: "Unbounded",
      cursor: "pointer",
      backgroundColor: selected ? "cornflowerblue" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 800 : 300,
      "&:hover": {
        backgroundColor: "cornflowerblue ",
        color: "black",
      },
      width: "12%",
      

    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectChartTime;