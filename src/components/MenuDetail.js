import React, { useState } from 'react';

const MenuDetail = () => {
    const [menus, setMenus] = useState([
        {
          title: '돈까스',
          text: '육즙이 잘좔좔....겉바속촉 감동의 맛.... 손님 울었음\n가격 13,000원',
          price: 13000,
          count: 0
        },
        {
          title: '파스타',
          text: '이것이 마약 파스타\n대마 함유\n가격 12,000원',
          price: 12000,
          count: 0
        },
        {
          title: '치킨',
          text: '육즙이 잘좔좔....겉바속촉 감동의 맛.... 손님 울었음\n가격 13,000원',
          price: 13000,
          count: 0
        },
        {
          title: '토스트',
          text: '이것이 마약 파스타\n대마 함유\n가격 12,000원',
          price: 12000,
          count: 0
        },
        {
          title: '옥수수',
          text: '육즙이 잘좔좔....겉바속촉 감동의 맛.... 손님 울었음\n가격 13,000원',
          price: 13000,
          count: 0
        },
        {
          title: '햄버거',
          text: '이것이 마약 파스타\n대마 함유\n가격 12,000원',
          price: 13000,
          count: 0
        },
      ]);
}

export default MenuDetail;