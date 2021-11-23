import { ref, Ref, computed } from "vue";

export default function useCollapse() {
  const collapse: Ref<boolean> = ref(false);
  const setCollapse = () => {
    collapse.value = !collapse.value;
  };
  const getCollapse = computed(() => {
    console.log(collapse.value);

    return collapse.value;
  });
  return { collapse, setCollapse, getCollapse };
}
