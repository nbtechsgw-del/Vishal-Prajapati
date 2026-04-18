function copyAddress(checkbox) {
  if (checkbox.checked) {
    document.getElementById("l_addr1").value =
      document.getElementById("p_addr1").value;
    document.getElementById("l_addr2").value =
      document.getElementById("p_addr2").value;
    document.getElementById("l_city").value =
      document.getElementById("p_city").value;
    document.getElementById("l_state").value =
      document.getElementById("p_state").value;
    document.getElementById("l_pincode").value =
      document.getElementById("p_pincode").value;
    document.getElementById("l_country").value =
      document.getElementById("p_country").value;
  } else {
    document.getElementById("l_addr1").value = "";
    document.getElementById("l_addr2").value = "";
    document.getElementById("l_city").value = "";
    document.getElementById("l_state").value = "";
    document.getElementById("l_pincode").value = "";
    document.getElementById("l_country").value = "";
  }
}
