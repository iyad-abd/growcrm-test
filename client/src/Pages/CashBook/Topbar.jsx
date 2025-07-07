import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../utils';
import { Add, } from '@mui/icons-material';
import CreateCashBook from './CreateCashBook';
import { searchCashbookReducer } from '../../redux/reducer/cashbook';

const Topbar = (view, setView) => {

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split('/')[1];
  const pathArr = pathname.split('/').filter(item => item != '');
  const showAddButton = !pathArr.includes('create');
  const descriptionElementRef = React.useRef(null);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement != null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleSearch = (searchTerm) => {
    dispatch(searchCashbookReducer(searchTerm));
  }
  const handleCreateopen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  return (
    <div className='flex flex-col font-primary'>
      <div className="w-full text-[14px] ">
        <Path />
      </div>

      <div className="flex justify-between flex-col sm:flex-row items-center mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-primary-blue text-[32px] capitalize font-light">{title}</h1>
          <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 text-xs sm:text-sm md:text-base font-medium">{timeZone}</span>
        </div>


        {showAddButton && (
          <button
            onClick={handleCreateopen("body")}
            className="bg-primary-red text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-lg"
          >
            <Add />
          </button>
        )}
      </div>
      <CreateCashBook open={open} setOpen={setOpen} scroll={scroll} />
    </div>
  );
};

export default Topbar;
