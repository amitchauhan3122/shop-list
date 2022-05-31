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
  const [search, setSearch] = useState({ area: '' });
  const [areaSearchTest, setAreaSearchTest] = useState('');
  const [categorySearchTest, setCategorySearchTest] = useState('');
  const [shopnameText, setShopNameText] = useState('');
  const [openingDateSearch, setOpeningDateSearch] = useState('');
  const [singleShop, setSingleShop] = useState({});
  const { data, refetch } = useQuery(["getShops"], () => getShops(search));
  console.log(areaSearchTest, 'areaSearchTestareaSearchTestareaSearchTest')
  useEffect(() => {
    console.log(areaSearchTest, 'areaSearchTestareaSearchTestareaSearchTest11')
    refetch()
  }, [areaSearchTest,search, categorySearchTest, openingDateSearch, shopnameText])
  useEffect(() => {
    dispatch(
      setShop({
        shop: data,
      })
    );
  }, [data]);
  const { mutate: deleteShop } = useMutation((shopId) => {
    deleteShopById(shopId)
      .then(() => {
        refetch();
        setShopList(true);
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
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const { mutate: getShop } = useMutation((shopId) => {
    getShopById(shopId)
      .then((res) => {
        dispatch(setSingleShopData(res));
        setSingleShop(res);
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
    updateShop(data);
  };

  return {
    showShopList,
    setShopList,
    handleAction,
    handleAddShop,
    handleUpdateShop,
    setAreaSearchTest,
    setCategorySearchTest,
    setOpeningDateSearch,
    setShopNameText,
    setSearch
  };
};
export default useShop;
