// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   SafeAreaView,
// } from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import CustomTextInput from '../../Components/CustomTextInput';
// import Checkbox from '../../Components/Checkbox';
// import Dropdown from '../../Components/Dropdown';
// import DateTimePicker from '../../Components/DateTimePicker';
// import ActionMenu from '../../Components/ActionMenu';
// import Button from '../../Components/Button';

// const options = [
//   {label: 'Option 1', value: 'option1'},
//   {label: 'Option 2', value: 'option2'},
//   {label: 'Option 3', value: 'option3'},
// ];

// export default function ExploreScreen() {
//   const {control, handleSubmit, reset, watch} = useForm({
//     defaultValues: {
//       search: '',
//       agree: false,
//       dropdown: null,
//       date: new Date(),
//     },
//   });

//   const onSubmit = data => {
//     Alert.alert('Dữ liệu form', JSON.stringify(data, null, 2));
//   };
//   //   console.log('watch', watch());
//   return (
//     <ScrollView style={styles.container}>
//       {/* <SafeAreaView> */}
//         <Controller
//           control={control}
//           name="search"
//           render={({field: {onChange, value}}) => (
//             <CustomTextInput
//               value={value}
//               onChangeText={onChange}
//               placeholder="Tìm kiếm..."
//               isSearch
//               style={{marginBottom: 16}}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name="agree"
//           render={({field: {onChange, value}}) => (
//             <Checkbox
//               label="Tôi đồng ý với điều khoản"
//               checked={value}
//               onChange={onChange}
//               style={{marginBottom: 16}}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name="dropdown"
//           render={({field: {onChange, value}}) => (
//             <Dropdown
//               options={options}
//               selected={value}
//               onSelect={onChange}
//               placeholder="Chọn một option"
//               style={{marginBottom: 16}}
//               filter
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name="date"
//           render={({field: {onChange, value}}) => (
//             <DateTimePicker
//               value={value}
//               onChange={onChange}
//               mode="date"
//               label="Chọn ngày"
//               style={{marginBottom: 16}}
//             />
//           )}
//         />
//         <ActionMenu
//           title="Chọn tác vụ"
//           items={[
//             {label: 'Thẩm xét (CV)', onPress: () => console.log('CV')},
//             {label: 'Xét duyệt (P.TP)', onPress: () => console.log('PTP')},
//             {label: 'Ký duyệt (TP)', onPress: () => console.log('TP')},
//             {
//               label: 'Thu hồi',
//               danger: true,
//               onPress: () => console.log('Thu hồi'),
//             },
//           ]}
//         />
//         <Button title="Gửi" onPress={handleSubmit(onSubmit)} />
//         <Button
//           title="Reset"
//           variant="secondary"
//           onPress={() => reset()}
//           color="#888"
//         />
//       {/* </SafeAreaView> */}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//     paddingTop: 40,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     color: '#0984e3',
//     textAlign: 'center',
//   },
// });

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {MAX_H, MAX_W} from '../../Common/GlobalStyles';

const {width, height} = Dimensions.get('window');

const ExploreScreen = () => {
  const featuredContent = [
    {
      id: 1,
      title: 'Body language with maya daryen',
      subtitle: '@maya.daryen',
      image:
        'https://media.istockphoto.com/id/1424208861/photo/beautiful-woman.jpg?s=612x612&w=0&k=20&c=pxbBpBas01Q4qpI24ZmkIZbyuAQ82S9fEl772IK7YVc=',
      gradient: ['#D4B5A0', '#F5E6D3'],
      creator: 'Maya Daryen',
    },
    {
      id: 2,
      title: 'Summer bensa collection',
      subtitle: 'collection',
      image:
        'https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_8.jpg',
      gradient: ['#87CEEB', '#E0F6FF'],
      creator: 'Bensa',
    },
  ];

  const trendingItems = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1506629905607-21e2e3d38c96?w=100',
      isHot: true,
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      isHot: false,
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100',
      isHot: false,
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
      isHot: false,
    },
  ];

  const renderFeaturedCard = (item, index) => (
    <View
      key={item.id}
      style={[styles.featuredCard, index === 1 && styles.secondCard]}>
      <LinearGradient
        colors={item.gradient}
        style={styles.cardGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.cardHeader}>
          <View style={styles.creatorInfo}>
            <View style={styles.creatorAvatar}>
              <Text style={styles.creatorInitial}>{item.creator[0]}</Text>
            </View>
            <Text style={styles.creatorName}>{item.creator}</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followText}>Follow +</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContent}>
          <Image source={{uri: item.image}} style={styles.cardImage} />
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        </View>

        <View style={styles.trendingSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {trendingItems.map(trending => (
              <View key={trending.id} style={styles.trendingItem}>
                <Image
                  source={{uri: trending.image}}
                  style={styles.trendingImage}
                />
                {trending.isHot && (
                  <View style={styles.hotBadge}>
                    <Text style={styles.hotText}>🔥</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <ImageBackground
      style={styles.container}
      source={{
        uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1080',
      }}>
      {/* Header */}
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Today</Text>
          <View style={styles.hotTag}>
            <Text style={styles.hotTagText}>Hot 🔥</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* We follow trends section */}
          <View style={styles.trendsHeader}>
            <Text style={styles.trendsTitle}>We follow{'\n'}trends</Text>
            <Text style={styles.trendsSubtitle}>
              Discover the latest fashion{'\n'}and lifestyle inspirations
            </Text>
          </View>

          {/* Featured Cards */}
          <View style={styles.cardsContainer}>
            {featuredContent.map((item, index) =>
              renderFeaturedCard(item, index),
            )}
          </View>

          {/* Bottom Navigation Dots */}
          <View style={styles.navigationDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  hotTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  hotTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  trendsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  trendsTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    lineHeight: 40,
  },
  trendsSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
  },
  cardsContainer: {
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: width - 40,
    height: height * 0.7,
    borderRadius: 25,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  secondCard: {
    height: height * 0.6,
  },
  cardGradient: {
    flex: 1,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  creatorInitial: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  creatorName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  followButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  cardImage: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    resizeMode: 'cover',
  },
  cardFooter: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  trendingSection: {
    marginTop: 10,
  },
  trendingItem: {
    marginRight: 15,
    position: 'relative',
  },
  trendingImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  hotBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff4757',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotText: {
    fontSize: 10,
  },
  navigationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 20,
  },
});
