import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setShop, setSingleShopData } from "./redux/action";
import { useQuery, useMutation } from "react-query";
import {
  getShops,
  getShopById,
  deleteShopById,
  updateShopById,
  addShopData,
} from "./api";

const useShop = (props) => {
  const dispatch = useDispatch();
  const [showShopList, setShopList] = useState(true);
  const [singleShop, setSingleShop] = useState({});
  const { data, refetch } = useQuery(["getShops"], () => getShops());

  useEffect(() => {
    dispatch(
      setShop({
        shop: data,
      })
    );
  }, [data]);
  const { mutate: deleteShop } = useMutation((shopId) => {
    console.log(shopId, "wishListArrayById, cartArrayById, userId");
    deleteShopById(shopId)
      .then(() => {
        refetch();
        setShopList(true);
        console.log(data);
        console.log("why not?");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const { mutate: addShop } = useMutation((data) => {
    addShopData(data)
      .then(() => {
        refetch();
        setShopList(true);
        console.log(data);
        console.log("why not?");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const { mutate: getShop } = useMutation((shopId) => {
    console.log(shopId, "wishListArrayById, cartArrayById, userId");
    getShopById(shopId)
      .then((res) => {
        dispatch(setSingleShopData(res));
        setSingleShop(res);
        console.log(data);
        console.log("why not?");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const { mutate: updateShop } = useMutation((data) => {
    updateShopById(data)
      .then((res) => {
        dispatch(setSingleShopData({}));
        setSingleShop({});
        refetch();
        console.log(data);
        console.log("why not?");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const handleAction = (id, type) => {
    if (type === "edit") {
      getShop(id);
    } else if (type === "delete") {
      deleteShop(id);
    } else {
    }
  };
  const handleAddShop = (data) => {
    addShop(data);
  };
  const handleUpdateShop = (data) => {
    console.log(data, "datadatadatadata");
    updateShop(data);
  };

  console.log(singleShop, "singleShopsingleShopsingleShopsingleShop");
  return {
    showShopList,
    setShopList,
    handleAction,
    handleAddShop,
    handleUpdateShop,
  };
};
export default useShop;
