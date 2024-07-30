import React, { useState, useEffect } from "react";
import { Text, Modal, View, Image, Alert, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components/native";
import { launchImageLibrary } from "react-native-image-picker";
import AddPictureButton from "../assets/buttons/add_picture.svg";

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
    display: flex;
    align-items: center;
    background-color: white;
    padding: 30px;
    border-radius: 15px;
    width: 80%;
`;

const DateText = styled.Text`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Medium';
    font-size: 16px;
    margin-bottom: 5px;
`;

const Input = styled.TextInput`
    border: none;
    padding: 10px;
    font-family: 'SpoqaHanSansNeo-Light';
    letter-spacing: -0.3px;
`;

const SaveButton = styled.TouchableOpacity`
    background-color: #007AFF;
    padding: 8px 10px;
    border-radius: 20px;
    margin-left: 5px;
`;

const DeleteButton = styled.TouchableOpacity`
    background-color: #fff;
    border: 1px solid #AEAEB2;
    padding: 7px 9px;
    border-radius: 20px;
`;

const SaveButtonText = styled.Text`
    color: white;
    text-align: center;
    font-size: 12px;
`;

const DeleteButtonText = styled.Text`
    color: #585A64;
    text-align: center;
    font-size: 12px;
`;

const DoneTaskModal = ({ visible, onClose, task, onSave, onDelete, date }) => {
  const [icon, setIcon] = useState("📝");
  const [title, setTitle] = useState("새로운 작업");
  const [journal, setJournal] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (task) {
      setIcon(task.icon || "📝");
      setTitle(task.title || "새로운 작업");
      setJournal(task.journal || "");
      setImages(task.images || []);
    }
  }, [task]);

  const pickImage = () => {
    if (images.length >= 3) {
      Alert.alert("최대 3개의 사진만 첨부할 수 있습니다.");
      return;
    }

    const options = {
      mediaType: "photo",
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setImages([...images, source.uri]);
      }
    });
  };

  const handleDeleteImage = (uri) => {
    Alert.alert("사진 삭제", "정말로 이 사진을 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        onPress: () => {
          setImages(images.filter((image) => image !== uri));
        },
        style: "destructive",
      },
    ]);
  };

  const handleSave = () => {
    onSave({ id: task?.id, icon, title, journal, images });
    onClose();
  };

  const handleDelete = () => {
    Alert.alert("작업 삭제", "정말로 이 작업을 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        onPress: () => {
          onDelete(task.id);
          onClose();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <ModalContainer>
        <ModalContent>
          <DateText>{date}</DateText>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Input maxLength={1} value={icon} onChangeText={setIcon} placeholder="아이콘" />
            <Input style={{ flex: 1 }} value={title} onChangeText={setTitle} placeholder="제목" />
          </View>
          <ScrollView horizontal style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: "row" }}>
              {images.map((imageUri) => (
                <TouchableOpacity key={imageUri} onPress={() => handleDeleteImage(imageUri)}>
                  <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, margin: 5 }} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <Input
            value={journal}
            onChangeText={setJournal}
            placeholder="오늘의 하루를 기록해 보세요!"
            style={{ width: "100%", height: 150 }}
            multiline
            numberOfLines={4}
          />
          <View style={{ direction: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <AddPictureButton onPress={pickImage} />
              <Text style={{fontFamily: 'SpoqaHanSansNeo-Light', fontSize: 12, marginLeft: 5}}>{` ${images.length}/3`}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <DeleteButton onPress={handleDelete}>
                <DeleteButtonText>삭제</DeleteButtonText>
              </DeleteButton>
              <SaveButton onPress={handleSave}>
                <SaveButtonText>저장</SaveButtonText>
              </SaveButton>
            </View>
          </View>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default DoneTaskModal;
