import { useState, useCallback } from 'react';
import { View, Image, TouchableOpacity, FlatList, Modal, Text, Alert, Linking } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { router, useFocusEffect } from "expo-router";

import { styles } from "./styles";
import { colors } from '@/styles/colors';
import { categories } from '@/utils/categories';

import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";
import { linkStorage, type LinkStorage } from '@/storage/link-storage';

export default function Index() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [links, setLinks] = useState<LinkStorage[]>([]);
    const [link, setLink] = useState<LinkStorage>({} as LinkStorage);
    const [category, setCategory] = useState<string>(categories[0].name);

    async function getLinks() {
        try {
            const response = await linkStorage.get()

            const filteredLinks = response.filter((link) => link.category === category);

            setLinks(filteredLinks);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os links');
        }
    }

    async function removeLink() {
        try {
            await linkStorage.remove(link.id);
            getLinks();
            setShowModal(false);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o link');
            console.error(error);
        }
    }

    function handleRemove() {
        Alert.alert('Excluir', 'Deseja realmente excluir o link?', [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: removeLink
            }
        ])
    }

    async function handleOpen() {
        try {
            await Linking.openURL(link.url);
            setShowModal(false);
        } catch (error) {
            Alert.alert('Link', 'Não foi possível acessar o link');
            console.error(error);
        }
    } 

    function handleDetails(selectedLink: LinkStorage) {
        setShowModal(true);
        setLink(selectedLink);
    }

    useFocusEffect(
        useCallback(() => {
            getLinks();
        }, [category])
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require("@/assets/logo.png")} style={styles.logo} />

                <TouchableOpacity onPress={() => router.navigate("/add")}>
                    <MaterialIcons name="add" size={32} color={colors.green[300]} />
                </TouchableOpacity>
            </View>

            <Categories onChange={setCategory} selectedCategory={category} />

            <FlatList
                data={links}
                keyExtractor={(item) => item.id} renderItem={({ item }) => (
                    <Link
                        name={item.name}
                        url={item.url}
                        onDatails={() => handleDetails(item)}
                    />
                )}
                style={styles.links}
                contentContainerStyle={styles.linksContent}
                showsVerticalScrollIndicator={false}
            />

            <Modal visible={showModal} transparent animationType='slide'>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalCategory}>{link.category}</Text>

                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <MaterialIcons name="close" size={20} color={colors.gray[400]} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalLinkName}>{link.name}</Text>

                        <Text style={styles.modalUrl}>
                            {link.url}
                        </Text>

                        <View style={styles.modalFooter}>
                            <Option name="Abrir" icon="language" onPress={handleOpen} />
                            <Option name="Excluir" icon="delete" variant="secondary" onPress={handleRemove} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}