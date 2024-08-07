import React, { useState, useEffect, useCallback } from "react";
import { Text, Modal, View, Image, Alert, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { launchImageLibrary } from "react-native-image-picker";
import AddPictureButton from "../assets/buttons/add_picture.svg";
import emojiRegex from "emoji-regex";

const isSingleEmoji = (text) => {
  const regex = emojiRegex();
  const matches = text.match(regex);
  return matches && matches.length === 1 && matches[0] === text;
};

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

const Input = styled(TextInput)`
    border: none;
    padding: 10px;
    font-family: 'SpoqaHanSansNeo-Light';
    letter-spacing: -0.3px;
`;

const SaveButton = styled.TouchableOpacity`
    background-color: #007AFF;
    padding: 7px 12px;
    border-radius: 20px;
    margin-left: 5px;
`;

const DeleteButton = styled.TouchableOpacity`
    background-color: #fff;
    border: 1px solid #AEAEB2;
    padding: 6px 11px;
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
  const [initialState, setInitialState] = useState({});
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (task) {
      const initial = {
        icon: task.icon || "📝",
        title: task.title || "새로운 작업",
        journal: task.journal || "",
        images: task.images || [],
      };
      setIcon(initial.icon);
      setTitle(initial.title);
      setJournal(initial.journal);
      setImages(initial.images);
      setInitialState(initial);
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
        setIsModified(true); // 변경사항 플래그 설정
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
          setIsModified(true); // 변경사항 플래그 설정
        },
        style: "destructive",
      },
    ]);
  };

  const handleSave = () => {
    onSave({ id: task?.id, icon, title, journal, images });
    setInitialState({ icon, title, journal, images });
    setIsModified(false); // 변경사항 저장 후 플래그 리셋
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

  const handleIconChange = (text) => {
    if (isSingleEmoji(text) || text === "") {
      setIcon(text);
      setIsModified(true); // 변경사항 플래그 설정
    }
  };

  const handleModalClose = useCallback(() => {
    if (
      icon !== initialState.icon ||
      title !== initialState.title ||
      journal !== initialState.journal ||
      images.length !== initialState.images.length
    ) {
      Alert.alert(
        "변경사항 저장",
        "변경사항이 저장되지 않았습니다. 그래도 닫으시겠습니까?",
        [
          { text: "취소", style: "cancel" },
          { text: "닫기", onPress: () => {
              // 변경사항 롤백
              setIcon(initialState.icon);
              setTitle(initialState.title);
              setJournal(initialState.journal);
              setImages(initialState.images);
              setIsModified(false); // 변경사항 플래그 리셋
              onClose();
            }, style: "destructive" }
        ]
      );
    } else {
      onClose();
    }
  }, [icon, title, journal, images, initialState, onClose]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <ModalContainer>
          <TouchableWithoutFeedback>
            <ModalContent>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", marginBottom: 10 }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <DateText>{date}</DateText>
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
                <Input
                  value={icon}
                  onChangeText={handleIconChange}
                  placeholder="📝"
                  style={{ width: 40, textAlign: "center" }}
                />
                <Input
                  style={{ flex: 1 }}
                  value={title}
                  onChangeText={(text) => {
                    setTitle(text);
                    setIsModified(true); // 변경사항 플래그 설정
                  }}
                  placeholder="제목"
                />
              </View>
              <ScrollView horizontal>
                <View style={{ flexDirection: "row" }}>
                  {images.map((imageUri) => (
                    <TouchableOpacity
                      style={{ marginBottom: 10 }}
                      key={imageUri}
                      onPress={() => handleDeleteImage(imageUri)}
                    >
                      <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, margin: 5 }} />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
              <Input
                value={journal}
                onChangeText={(text) => {
                  setJournal(text);
                  setIsModified(true); // 변경사항 플래그 설정
                }}
                placeholder="오늘의 하루를 기록해 보세요!"
                style={{ width: "100%", height: 150, textAlignVertical: "top" }}
                multiline
                numberOfLines={4}
              />
              <View
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}
              >
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                  <AddPictureButton onPress={pickImage} />
                  <Text style={{ fontFamily: "SpoqaHanSansNeo-Light", fontSize: 12, marginLeft: 5 }}>
                    {` ${images.length}/3`}
                  </Text>
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
          </TouchableWithoutFeedback>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DoneTaskModal;
