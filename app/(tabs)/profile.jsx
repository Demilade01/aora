import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getUserPosts, searchPosts, signOut } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'

import { router } from 'expo-router'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false)

    router.replace('/sign-in')
  }

  return (
    <SafeAreaView className="bg-primary h-full"> 
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity 
              className='w-full items-end mb-10'
              onPress={logout}  
            >
              <Image 
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>

            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image 
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg "
                resizeMode='cover'
              />
            </View>

            <InfoBox 
              title={user?.username}
              containerStyle='mt-5'
              titleStyles='text-lg'
            />

            <View className='mt-5 flex-row'>
              <InfoBox 
                title={posts.length || 0}
                subtitle="Posts"
                containerStyle='mr-10'
                titleStyles='text-xl'
              />
              <InfoBox 
                title="1.2k"
                subtitle="Followers"
                titleStyles='text-xl'
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Profile