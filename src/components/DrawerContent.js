import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

const DrawerContent = props => {
  const [isLogged, setIsLogged] = useState(false);

  const handleLoginPress = () => {
    setIsLogged(true);
    props.navigation.navigate('LoginScreen');
  }

  const handleLogoutPress = () => {
    setIsLogged(false);
  }

  const handleProfilePress = () => {
    if (isLogged) {
      props.navigation.navigate('ProfileScreen');
    }
  }

  const [isListSubMenuVisible, setListSubMenuVisible] = useState(false);
  const [isProfileSubMenuVisible, setProfileSubMenuVisible] = useState(false);
  const [isListSubMenuVisible1, setListSubMenuVisible1] = useState(false);
  const [isListSubMenuVisible2, setListSubMenuVisible2] = useState(false);

  const handleListSubMenuToggle = () => {
    setListSubMenuVisible(!isListSubMenuVisible);
  };

  const handleProfileSubMenuToggle = () => {
    setProfileSubMenuVisible(!isProfileSubMenuVisible);
  };

  const handleListSubMenuToggle1 = () => {
    setListSubMenuVisible1(!isListSubMenuVisible1);
  };

  const handleListSubMenuToggle2 = () => {
    setListSubMenuVisible2(!isListSubMenuVisible2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <TouchableOpacity onPress={isLogged ? handleProfilePress : handleLoginPress}>
          {isLogged ? (
            <View>
              <View>
                <TouchableOpacity onPress={handleLogoutPress}><Text style={{color: 'black', textDecorationLine: 'underline', marginTop:-25, marginLeft:150, marginRight:-20}}>로그아웃</Text></TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={styles.profileImage}
                  source={{ uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg' }}
                />
                <Text style={styles.profileText}>구름이</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.text}>로그인하기</Text>
          )}
        </TouchableOpacity>
        {!isLogged && (
          <View style={{flexDirection: 'row', marginTop:10}}>
            <Text style={{color: 'black'}}>아직 회원이 아니시라면 </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('SignupScreen')}>
              <Text style={{color: 'black', textDecorationLine: 'underline'}}>회원가입</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <DrawerContentScrollView {...props}>
        <TouchableOpacity onPress={() => props.navigation.navigate('tabMap')}>
          <View style={styles.drawerItemContainer}>
            <Icon style={styles.drawerIcon} name="map" size={25}></Icon>
            <Text style={styles.drawerLabel}>지도</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate('tabList')}>
          <View style={styles.drawerItemContainer}>
            <Icon style={styles.drawerIcon} name="restaurant" size={25}></Icon>
            <Text style={{...styles.drawerLabel, marginRight: 94}}>가게 리스트</Text>
            <TouchableOpacity onPress={handleListSubMenuToggle}>
              <Icon
                name={isListSubMenuVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {isListSubMenuVisible && (
          <View style={styles.subMenuContainer}>
            <TouchableOpacity onPress={handleListSubMenuToggle1}>
              <View style={styles.subdrawerItemContainer}>
                <Text style={{...styles.subMenuLabel1, marginRight:105}}>카테고리</Text>
                <Icon
                  name={isListSubMenuVisible1 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={30}
                />
              </View>
            </TouchableOpacity>

            {isListSubMenuVisible1 && (
              <View style={styles.subSubMenuContainer}>
                <TouchableOpacity>
                  <Text style={styles.subMenuLabel}>전체</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.subMenuLabel}>한식</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.subMenuLabel}>중식</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.subMenuLabel}>일식 돈가스</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.subMenuLabel}>양식</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.subMenuLabel}>동남아</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.subMenuLabel}>분식</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.subMenuLabel}>혼밥</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity onPress={handleListSubMenuToggle2}>
              <View style={styles.subdrawerItemContainer}>
                <Text style={{...styles.subMenuLabel1, marginRight:128}}>정렬</Text>
                <Icon
                  name={isListSubMenuVisible2 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={30}
                />
              </View>
            </TouchableOpacity>

            {isListSubMenuVisible2 && (
              <View style={styles.subSubMenuContainer}>
                <TouchableOpacity>
                  <Text style={styles.subMenuLabel}>거리 순</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.subMenuLabel}>별점 순</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.subMenuLabel}>리뷰 많은 순</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('subMenu3');
                setListSubMenuVisible(false);
              }}>
              <View style={styles.subdrawerItemContainer}>
                <Text style={styles.subMenuLabel}>찜한 가게</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity onPress={() => props.navigation.navigate('ProfileScreen')}>
          <View style={styles.drawerItemContainer}>
            <Icon style={styles.drawerIcon} name="person" size={25}></Icon>
            <Text style={{...styles.drawerLabel, marginRight: 120}}>내 정보</Text>
            <TouchableOpacity onPress={handleProfileSubMenuToggle}>
              <Icon
                name={isProfileSubMenuVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {isProfileSubMenuVisible && (
          <View style={styles.subMenuContainer}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('CouponScreen');
                setProfileSubMenuVisible(false);
              }}>
              <Text style={styles.subMenuLabel}>쿠폰함</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ReviewScreen');
                setProfileSubMenuVisible(false);
              }}>
              <Text style={styles.subMenuLabel}>리뷰 관리</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ReservationScreen');
                setProfileSubMenuVisible(false);
              }}>
              <Text style={styles.subMenuLabel}>예약 관리</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('BookmarkScreen');
                setProfileSubMenuVisible(false);
              }}>
              <Text style={styles.subMenuLabel}>찜 목록</Text>
            </TouchableOpacity>
          </View>
        )}

      </DrawerContentScrollView>

    </View>
  );
};

const mapStateToProps = (state) => ({
  isLogged: state.isLogged,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flexDirection: 'column',
    padding: 50,
    backgroundColor: '#f6f6f6',
    marginBottom: 10,
  },
  text: {
    fontSize: 30,
    color: 'black'
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileText: {
    margin: 30,
    fontSize: 20,
    color:'grey'
  },
  drawerItemContainer: {
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    marginBottom: 20,
    width: '90%'
  },
  drawerIcon: {
    marginLeft: '5%',
  },
  drawerLabel: {
    fontSize: 16,
    marginLeft: '5%',
  },
  subMenuContainer: {
    marginLeft: 20,
    marginTop: -15,
    marginBottom:10,
  },
  subMenuLabel: {
    fontSize: 14,
    marginLeft: '10%',
    marginVertical: 10,
  },
  subdrawerItemContainer: {
    marginTop: '3%',
    marginLeft: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    marginBottom: 5,
    width: '80%'
  },
  subMenuLabel1: {
    fontSize: 14,
    marginLeft: '8%',
    marginVertical: 10,
  },
  subSubMenuContainer: {
    marginLeft: 20,
    marginBottom: 5,
  },
});

export default DrawerContent; connect(mapStateToProps)(DrawerContent);