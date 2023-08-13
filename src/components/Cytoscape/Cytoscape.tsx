import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";

cytoscape.use(coseBilkent);

const data = [
  {
    data: {
      id: "0x00",
      label: "vitalik.eth",
      bgImg:
        "https://i.seadn.io/gae/-W8LjhUTl0zTes3x1uVLFk1Wa6zQsxmPh68ZT0R8ehi3mSQ-1w7ePqcpHABOISu2IzIIMAxkQ88zHiKk_SX89S8Piz28L1pvUK7Yvgw?auto=format&dpr=1&w=640",
    },
  },
  {
    data: {
      id: "0x01",
      label: "eddy.eth",
      bgImg:
        "https://i.seadn.io/gcs/files/7d0d02a79f3da14e97e3082a8e137d4f.png?auto=format&dpr=1&w=640",
    },
  },
  {
    data: {
      id: "0x02",
      label: "loie.eth",
      bgImg:
        "https://i.seadn.io/gcs/files/02ac4d20d71afeb2d8f7c11e36d492fb.png?auto=format&dpr=1&w=640",
    },
  },
  {
    data: {
      id: "0x03",
      label: "elon.eth",
      bgImg:
        "https://i.seadn.io/gcs/files/194d6a1437f534adef1e22f4558f4e24.png?auto=format&dpr=1&w=640",
    },
  },
  {
    data: {
      id: "0x04",
      label: "rose.eth",
      bgImg:
        "https://i.seadn.io/gcs/files/5f7f4d9d32c77a14f28ae9ab9a8561ce.png?auto=format&dpr=1&w=640",
    },
  },
  {
    data: {
      id: "0x05",
      label: "daniel.eth",
      bgImg:
        "https://i.seadn.io/gcs/files/e3fa973f2b5038fe0b6b83ce76907479.png?auto=format&dpr=1&w=640",
    },
  },
  {
    data: {
      id: "0x06",
      label: "chris.eth",
      bgImg:
        "https://i.seadn.io/gcs/files/503150288c9cbaf13939636b4a0d31aa.png?auto=format&dpr=1&w=640",
    },
  },
  {
    data: {
      id: "0x07",
      label: "alex.eth",
      bgImg:
        "https://i.seadn.io/gae/GgOG5GnYdMG1xHKNauQLQ-pUVEbb76UMWwmntRz0X0oBjZ6dHMzLWsexDUHBefRaUrxuya9x3ZhwU7pYUen9vvH7nOZ1fj2MS4gt-Q?auto=format&dpr=1&w=640",
    },
  },
  {
    data: {
      id: "0x08",
      label: "frank.eth",
      bgImg:
        "https://i.seadn.io/gcs/files/b2c21fc91ffd36aae411a032bc10a95c.png?auto=format&dpr=1&w=640",
    },
  },

  { data: { source: "0x00", target: "0x01" } },
  { data: { source: "0x01", target: "0x02" } },
  { data: { source: "0x01", target: "0x03" } },
  { data: { source: "0x03", target: "0x04" } },
  { data: { source: "0x03", target: "0x05" } },
  { data: { source: "0x02", target: "0x06" } },
  { data: { source: "0x06", target: "0x07" } },
  { data: { source: "0x01", target: "0x08" } },
];

const cy_for_rank = cytoscape({
  elements: data,
});

const pageRank = cy_for_rank.elements().pageRank();

const nodeMaxSize = 100;
const nodeMinSize = 50;
const fontMaxSize = 32;
const fontMinSize = 16;

const style = [
  {
    selector: "node",
    style: {
      "background-color": "#666",
      "background-fit": "cover",
      "background-image": "data(bgImg)",
      "font-family": "Bricolage Grotesque",
      label: "data(label)",
      width: function (ele: any) {
        return nodeMaxSize * pageRank.rank("#" + ele.id()) + nodeMinSize;
      },
      height: function (ele: any) {
        return nodeMaxSize * pageRank.rank("#" + ele.id()) + nodeMinSize;
      },
      "font-size": function (ele: any) {
        return fontMaxSize * pageRank.rank("#" + ele.id()) + fontMinSize;
      },
    },
  },

  {
    selector: "edge",
    style: {
      width: 2,
      // "curve-style": "bezier",
      "line-color": "#ccc",
      "target-arrow-color": "#ccc",
      "target-arrow-shape": "triangle",
    },
  },
];

const layout = {
  name: "cose-bilkent",
  animate: false,
  gravityRangeCompound: 1.5,
  fit: true,
  tile: true,
};

const Cytoscape = () => {
  const graphref = useRef(null);

  const drawgraph = () => {
    const cy = cytoscape({
      container: graphref.current,
      elements: data,
      style: style,
      layout: layout,
    });
  };

  useEffect(() => {
    drawgraph();
  }, []);

  return (
    <>
      <div ref={graphref} style={{ width: "100%", height: "80vh" }}></div>
    </>
  );
};

export default Cytoscape;
