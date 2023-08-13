import Cytoscape from "@/components/Cytoscape/Cytoscape";

export default function Graph() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Social graph page
      <Cytoscape />
    </div>
  );
}
