// src/utils/formatters.js

/**
 * Format date for display
 * @param {string} dateString - Date string from session
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  /**
   * Convert shot type code to display name
   * @param {string} shotType - Shot type code ('2pt', '3pt', 'ft')
   * @returns {string} Human-readable shot type
   */
  export const formatShotType = (shotType) => {
    switch (shotType) {
      case '2pt': return '2-Point';
      case '3pt': return '3-Point';
      case 'ft': return 'Free Throw';
      default: return shotType;
    }
  };
  
  /**
   * Get color for shot type
   * @param {string} shotType - Shot type code ('2pt', '3pt', 'ft')
   * @returns {string} Color for the shot type
   */
  export const getShotTypeColor = (shotType) => {
    switch (shotType) {
      case '2pt': return 'primary';
      case '3pt': return 'secondary';
      default: return 'default';
    }
  };
  
  /**
   * Format number with commas for thousands
   * @param {number} number - Number to format
   * @returns {string} Formatted number string
   */
  export const formatNumber = (number) => {
    return number.toLocaleString();
  };
  
  /**
   * Format percentage value
   * @param {number} value - Percentage value
   * @returns {string} Formatted percentage
   */
  export const formatPercentage = (value) => {
    return `${parseFloat(value).toFixed(1)}%`;
  };